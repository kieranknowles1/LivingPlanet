resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.region
}

module "network" {
  source              = "./network"
  resource_group_name = azurerm_resource_group.rg.name
  domain_name_label   = var.domain_name
  region              = var.region
}

data "http" "setup_ip" {
  url = "http://ifconfig.me"
}

# Network interface for the VM
resource "azurerm_network_interface" "nic" {
  name                = "${azurerm_resource_group.rg.name}-nic"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  ip_configuration {
    name                          = "testnicconfig"
    subnet_id                     = module.network.subnet_id
    private_ip_address_allocation = "Dynamic"
    # Expose the VM to the public internet
    public_ip_address_id = module.network.public_ip_id
  }
}

# Apply the security group to the NIC
resource "azurerm_network_interface_security_group_association" "nic_nsg_association" {
  network_interface_id      = azurerm_network_interface.nic.id
  network_security_group_id = module.network.security_group_id
}

# Create a virtual machine. Needs all of the resources created above
# Uses a B1s VM size. Can host 1 of these for free with a student account
resource "azurerm_linux_virtual_machine" "vm" {
  name                = "${azurerm_resource_group.rg.name}-vm"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location

  admin_username = var.username
  # The admin doesn't have a password, but don't even allow the option
  disable_password_authentication = true
  # Only allow login with the local machine's public key. Security rules also restrict the IP in case the key is compromised
  admin_ssh_key {
    username   = var.username
    public_key = file(var.ssh_public_key)
  }

  size                  = var.vm_size
  network_interface_ids = [azurerm_network_interface_security_group_association.nic_nsg_association.network_interface_id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = var.vm_disk_type
    disk_size_gb         = var.vm_disk_size
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    # Grab the latest LTS version of Ubuntu 22.04. Supported until 2027
    sku     = "22_04-lts-gen2"
    version = "latest"
  }

  user_data = base64encode(replace(templatefile("./userdata.tftpl", {
    username            = var.username
    domain              = module.network.fqdn
    email               = var.email
    openweather_api_key = var.openweather_api_key
  }), "\r\n", "\n"))
}

resource "azurerm_network_security_rule" "allow_ssh" {
  resource_group_name         = azurerm_resource_group.rg.name
  network_security_group_name = module.network.security_group_name

  name        = "SSH"
  description = "Allow SSH from the local machine to the VM only"
  priority    = 1000
  direction   = "Inbound"
  protocol    = "Tcp"
  access      = "Allow"

  source_port_range      = "*"
  destination_port_range = "22"

  source_address_prefix      = data.http.setup_ip.response_body
  destination_address_prefix = azurerm_linux_virtual_machine.vm.private_ip_address
}
