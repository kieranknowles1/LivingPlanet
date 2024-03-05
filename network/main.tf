# Create a network
resource "azurerm_virtual_network" "vnet" {
  name = "${var.resource_group_name}-vnet"
  resource_group_name = var.resource_group_name
  location = var.region
  address_space = ["10.0.0.0/16"]
}

# Create a subnet
resource "azurerm_subnet" "subnet" {
  name = "${var.resource_group_name}-subnet"
  resource_group_name = var.resource_group_name
  virtual_network_name = azurerm_virtual_network.vnet.name
  address_prefixes = ["10.0.1.0/24"]
}

# Create a public IP
resource "azurerm_public_ip" "publicip" {
  name = "${var.resource_group_name}-publicip"
  resource_group_name = var.resource_group_name
  location = var.region
  allocation_method = "Dynamic"
  domain_name_label = var.domain_name_label
}

# Create a network security group and rules
resource "azurerm_network_security_group" "securitygroup" {
  name = "${var.resource_group_name}-nsg"
  resource_group_name = var.resource_group_name
  location = var.region

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
