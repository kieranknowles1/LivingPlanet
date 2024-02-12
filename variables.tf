variable "region" {
  description = <<EOM
    Region to deploy resources, pick something close to you
    NOTE: Some regions do not support all resources needed for this app.
    NOTE: Please use the Azure cost calculator to estimate costs for your region.
    https://azure.microsoft.com/en-in/pricing/calculator/?cdn=disable
  EOM
  default = "uksouth"
}

variable "prefix" {
  description = "Prefix for all resources, must be unique to your subscription"
  default = "TestDeployment"
}

variable "vm_size" {
  description = "Size of the VM. A student account can host a single Standard_B1s VM for free"
  default = "Standard_B1s"
}

variable "username" {
  description = "Username for the VM"
  default = "azureuser"
}

variable "ssh_public_key" {
  description = "Path to the SSH public key used to access the VM"
  default = "~/.ssh/id_rsa.pub"
}
