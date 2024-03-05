variable "resource_group_name" {
  description = "The name of the resource group in which to create the network resources"
  type        = string
}

variable "region" {
  description = "The region in which to deploy the resources"
  type        = string
}

variable "domain_name_label" {
  description = "The Azure subdomain to assign to the public IP"
  type        = string
}
