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
These are not sensitive and can be safely committed to version control.
See the comments in the file for more information.
