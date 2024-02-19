# Living Planet

Kieran Knowles

KF6013: Cloud Computing and Web API Programming

## Introduction

This is a cloud-based web application created for the KF6013 module, to the specification documented in [brief.md](brief.md).

## Implementation

The app is specified using the Terraform configuration language, and deployed to Azure using the Terraform CLI.

It is hosted using a Standard B1s VM running Ubuntu 22.04 LTS, which can be
hosted at no cost using a student plan.

SSH access is allowed as the `azureuser` user with the only allowed connection
method being key-based authentication. The setup assumes that you have a
public key at `~/.ssh/id_rsa.pub`, if you don't have a key pair you can create
one using `ssh-keygen`.

To connect via SSH, use the following command:

```sh
ssh azureuser@<public-ip>
```

## Configuration

Config variables that you may want to change are located in `variables.tf`.
These are not sensitive unless stated otherwise, and can be safely committed to
source control.
See the comments in the file for more information.

## Deployment

To deploy the app, you must have the following available and on your PATH:
- [Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli)
- [Nushell](https://www.nushell.sh/install.html) (optional, scripts can be run manually)
- [Terraform CLI](https://www.terraform.io/downloads.html)

You must also be logged in to the Azure CLI using `az login`. Please avoid
doing this on a shared machine as it will allow others to access your Azure
account, which may result in unexpected charges.

To deploy the app, run `nu deploy.nu` from the root of the repository.

To take down the app, run `nu destroy.nu`. Make sure to do this when you're done to avoid any charges. It is also a good idea to set a
low budget alert to notify you if you spend any money.
