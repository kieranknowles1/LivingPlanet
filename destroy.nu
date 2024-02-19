# Plan takedown
terraform plan -destroy -out .\main.destroy.tfplan
# Apply the takedown
terraform apply .\main.destroy.tfplan
