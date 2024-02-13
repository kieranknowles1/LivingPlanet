# Exit on error
$ErrorActionPreference = "Stop"

# Only strictly required on first deployment. Install any required providers
terraform init

# Plan the deployment
terraform plan -out main.tfplan
# Review the plan here

# Apply the deployment
terraform apply main.tfplan
