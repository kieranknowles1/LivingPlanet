output "public_ip_id" {
  description = "The ID of the public IP. Not guaranteed to be allocated until used."
  value       = azurerm_public_ip.publicip.id
}

output "fqdn" {
  description = "The fully qualified domain name of the network"
  value       = azurerm_public_ip.publicip.fqdn
}

output "subnet_id" {
  description = "The ID of the subnet"
  value       = azurerm_subnet.subnet.id
}
