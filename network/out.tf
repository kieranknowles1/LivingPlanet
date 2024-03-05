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

output "security_group_name" {
  description = "The name of the security group. By default, this is configured with rules to allow inbound HTTP and HTTPS traffic, allow all outbound traffic, and deny all other inbound traffic."
  value = azurerm_network_security_group.securitygroup.name
}

output "security_group_id" {
  description = "The ID of the security group"
  value       = azurerm_network_security_group.securitygroup.id
}
