# Generate a random name for the storage account
resource "random_string" "storage_name" {
  length = 24
  special = false
  upper = false
  lower = true
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

resource "azurerm_storage_blob" "html" {
  name = "html.zip"
  storage_account_name = azurerm_storage_account.storage.name
  storage_container_name = azurerm_storage_container.src.name
  type = "Block"
  source = data.archive_file.src.output_path
}
