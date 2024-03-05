output "storage_account_name" {
  description = "The name of the storage account"
  value       = azurerm_storage_account.storage.name
}

output "src_container_name" {
  description = "Container that can be used to upload source code."
  value       = azurerm_storage_container.src.name
}

output "primary_blob_endpoint" {
  description = "The endpoint URL for the primary blob location"
  value       = azurerm_storage_account.storage.primary_blob_endpoint
}
