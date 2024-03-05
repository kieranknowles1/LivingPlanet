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
