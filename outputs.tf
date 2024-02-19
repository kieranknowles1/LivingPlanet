output "public_ip" {
  description = "The public IP address of the web server"
  value = azurerm_linux_virtual_machine.vm.public_ip_address
}

output "src_blob_url" {
  description = "The URL of the source code blob"
  value = azurerm_storage_blob.html.id
}
