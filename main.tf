resource "azurerm_resource_group" "rg" {
  name = "${var.prefix}-rg"
  location = var.region
}

module "network" {
  source = "./network"
  prefix = var.prefix
  resource_group_name = azurerm_resource_group.rg.name
  domain_name_label = var.domain_name
  region = var.region
}

data "http" "setup_ip" {
  url = "http://ifconfig.me"
}

# Create a network security group and rules
resource "azurerm_network_security_group" "securitygroup" {
  name = "${var.prefix}-nsg"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location

  security_rule {
    name = "SSH"
    description = "Allow SSH from the local machine to the VM only"
    priority = 1000
    # Do not allow a VM to SSH into another system
    direction = "Inbound"
    access = "Allow"
    protocol = "Tcp"
    source_port_range = "*"
    destination_port_range = "22"
    source_address_prefix = "${data.http.setup_ip.response_body}"
    destination_address_prefix = azurerm_linux_virtual_machine.vm.private_ip_address
  }
  security_rule {
    name = "HTTP"
    description = "Allow HTTP from any source"
    priority = 1001
    direction = "Inbound"
    access = "Allow"
    protocol = "Tcp"
    source_port_range = "*"
    destination_port_range = "80"
    # Allow anyone to access the web server. Necessary for a public-facing web server,
    # but a private one should be locked down to a specific IP range
    source_address_prefix = "*"
    destination_address_prefix = "*"
  }
  security_rule {
    name = "HTTPS"
    description = "Allow HTTPS from any source"
    priority = 1002
    direction = "Inbound"
    access = "Allow"
    protocol = "Tcp"
    source_port_range = "*"
    destination_port_range = "443"
    source_address_prefix = "*"
    destination_address_prefix = "*"
  }
  # Azure's default rules deny any inbound traffic not explicitly allowed
  # and allow all outbound traffic.
}

# Network interface for the VM
resource "azurerm_network_interface" "nic" {
  name = "${var.prefix}-nic"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location

  ip_configuration {
    name = "testnicconfig"
    subnet_id = module.network.subnet_id
    private_ip_address_allocation = "Dynamic"
    # Expose the VM to the public internet
    public_ip_address_id = module.network.public_ip_id
  }
}

# Apply the security group to the NIC
resource "azurerm_network_interface_security_group_association" "nic_nsg_association" {
  network_interface_id = azurerm_network_interface.nic.id
  network_security_group_id = azurerm_network_security_group.securitygroup.id
}

# Create a virtual machine. Needs all of the resources created above
# Uses a B1s VM size. Can host 1 of these for free with a student account
resource "azurerm_linux_virtual_machine" "vm" {
  name = "${var.prefix}-vm"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location

  admin_username = var.username
  # Use the SSH key from the local machine. This will be the only way to access the VM
  admin_ssh_key {
    username = var.username
    public_key = file(var.ssh_public_key)
  }

  size = var.vm_size
  network_interface_ids = [azurerm_network_interface.nic.id]

  os_disk {
    caching = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer = "0001-com-ubuntu-server-jammy"
    # Grab the latest LTS version of Ubuntu 22.04. Supported until 2027
    sku = "22_04-lts-gen2"
    version = "latest"
  }

  user_data = base64encode(replace(templatefile("./userdata.tftpl", {
    mysql_password = var.mysql_password
    src_blob_url = azurerm_storage_blob.html.id
    username = var.username
    domain = module.network.fqdn
    email = var.email
  }), "\r\n", "\n"))

  boot_diagnostics {
    storage_account_uri = azurerm_storage_account.storage.primary_blob_endpoint
  }
}
