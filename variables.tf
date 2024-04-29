variable "region" {
  description = <<EOM
    Region to deploy resources, pick something close to you
    NOTE: Some regions do not support all resources needed for this app.
    NOTE: Please use the Azure cost calculator to estimate costs for your region.
    https://azure.microsoft.com/en-in/pricing/calculator/?cdn=disable
  EOM
  default = "uksouth"
}

variable "resource_group_name" {
  description = "Resource group to deploy resources. Resource names will be prefixed with this value"
  default = "LivingPlanet"
}

variable "domain_name" {
  description = "The domain name prefix bound to the public IP. Must be unique to the region"
  default = "livingplanet"
}

variable "username" {
  description = "Username for the VM"
  default = "azureuser"
}

variable "ssh_public_key" {
  description = "Path to the SSH public key used to access the VM"
  default = "~/.ssh/id_rsa.pub"
}

variable "email" {
  description = "Email address to send Let's Encrypt expiration notices to"
  sensitive = true
}

variable "openweather_api_key" {
  description = "API key for OpenWeatherMap"
  sensitive = true
}

# VM configuration
# Defaults are covered by the student free tier
# A smaller VM will be cheaper, but is not covered by the free tier
variable "vm_size" {
  description = "Size of the VM. A student account can host a single Standard_B1s VM for free"
  default = "Standard_B1s"
}

variable "vm_disk_type" {
  description = "Type of disk to use for the VM"
  default = "Premium_LRS"
}

variable "vm_disk_size" {
  description = "Size of the VM disk in GB"
  default = 64
}
