# Region to deploy resources, pick something close to you
# NOTE: Some regions do not support all resources.
# NOTE: Please use the Azure cost calculator to estimate costs for your region.
# https://azure.microsoft.com/en-in/pricing/calculator/?cdn=disable
variable "region" {
  default = "uksouth"
}

# Prefix for all resources
variable "prefix" {
  default = "TestDeployment"
}
