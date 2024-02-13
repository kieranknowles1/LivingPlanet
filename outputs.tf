output "public_ip" {
  description = "The public IP address of the web server"
  value = azurerm_linux_virtual_machine.vm.public_ip_address
}
