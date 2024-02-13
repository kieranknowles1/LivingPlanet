locals {
  data_inputs = {
    mysql_password = var.mysql_password
  }
}

resource "azurerm_resource_group" "rg" {
  name = "${var.prefix}-rg"
  location = var.region
}

# Create a network
resource "azurerm_virtual_network" "vnet" {
  name = "${var.prefix}-vnet"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  address_space = ["10.0.0.0/16"]
}

# Create a subnet
resource "azurerm_subnet" "subnet" {
  name = "${var.prefix}-subnet"
  resource_group_name = azurerm_resource_group.rg.name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = ["10.0.1.0/24"]
}

# Create a public IP
resource "azurerm_public_ip" "publicip" {
  name = "${var.prefix}-publicip"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  allocation_method = "Dynamic"
}

# Create a network security group and rules
resource "azurerm_network_security_group" "securitygroup" {
  name = "${var.prefix}-nsg"
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location

  security_rule {
    name = "SSH"
    description = "Allow SSH from any source"
    priority = 1000
    # Do not allow a VM to SSH into another system
    direction = "Inbound"
    access = "Allow"
    protocol = "Tcp"
    source_port_range = "*"
    destination_port_range = "22"
    # This could be secured further by setting this to the IP of the admin's machine
    source_address_prefix = "*"
    # Could be set to the IP of a specific VM
    destination_address_prefix = "*"
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
    subnet_id = azurerm_subnet.subnet.id
    private_ip_address_allocation = "Dynamic"
    # Expose the VM to the public internet
    public_ip_address_id = azurerm_public_ip.publicip.id
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

  user_data = base64encode(templatefile("./userdata.tftpl", local.data_inputs))
}
