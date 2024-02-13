terraform {
  required_version = ">= 1.7.2"

  required_providers {
    # Used to zip the source code
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.0"
    }

    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }

    # Used to generate a unique name for the storage account
    random = {
      source  = "hashicorp/random"
      version = "~> 3.0"
    }
  }
}

provider "archive" {

}

provider "azurerm" {
  features {}
  skip_provider_registration = true
}

provider "random" {

}
