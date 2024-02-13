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
  resource_group_name = azurerm_resource_group.rg.name
  location = azurerm_resource_group.rg.location
  account_tier = "Standard"
  account_replication_type = "LRS"
}

resource "azurerm_storage_container" "src" {
  name = "src"
  storage_account_name = azurerm_storage_account.storage.name
  container_access_type = "blob"
}

# Zip and upload the source code to the storage account
data "archive_file" "src" {
  type = "zip"
  source_dir = "html"
  output_path = "html.zip"
}

# Blob containing the zippped source code. The ID of the resource is the URL to the blob
resource "azurerm_storage_blob" "html" {
  name = "html.zip"
  storage_account_name = azurerm_storage_account.storage.name
  storage_container_name = azurerm_storage_container.src.name
  type = "Block"
  source = data.archive_file.src.output_path
}
