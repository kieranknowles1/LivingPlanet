output "fqdn" {
  description = "The public domain of the web server. Bind your own domain to this or visit the address directly."
  value = module.network.fqdn
}

output "ssh_string" {
  description = "The SSH/SCP string to connect to the VM"
  value = "${var.username}@${module.network.fqdn}"
}
