output "fqdn" {
  description = "The public domain of the web server. Bind your own domain to this or visit the address directly."
  value = module.network.fqdn
}

output "src_blob_url" {
  description = "The URL of the source code blob"
  value = azurerm_storage_blob.html.id
}
