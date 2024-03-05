# Generate a random name for the storage account
resource "random_string" "storage_name" {
  length = 24
  special = false
  upper = false
  lower = true
}

# Create a storage account for the source code
# The name needs to be globally unique, so we use a random string
resource "azurerm_storage_account" "storage" {
  name = "${random_string.storage_name.result}"
  resource_group_name = var.resource_group_name
  location = var.region
  account_tier = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "src" {
  name = "src"
  storage_account_name = azurerm_storage_account.storage.name
  container_access_type = "blob"
}
