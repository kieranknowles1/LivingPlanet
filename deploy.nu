# Deployment script for the infrastructure
def main [
    --update # Download the latest version of the source code to the vm
] {
    # Only strictly required on first deployment. Install any required providers
    terraform init

    # Plan the deployment
    terraform plan -replace="azurerm_storage_blob.html" -out main.tfplan
    # Review the plan here

    # Apply the deployment
    terraform apply main.tfplan

    if ($update) {
        update
    }
}

def update [] {
    # Plan and apply has uploaded the latest source code to the storage account
    # just need to SSH into the VM and pull the latest code
    print "Uploading the new source code to the VM..."
    print "You may have to enter your SSH password and/or accept the host key."

    let public_ip = terraform output -raw public_ip
    let blob_url = terraform output -raw src_blob_url

    let commands = [
        $"sudo wget -O /tmp/src.zip ($blob_url)",
        "sudo rm -rf /var/www/html/*",
        "sudo unzip /tmp/src.zip -d /var/www/html"
    ] | str join " && "

    ssh $"azureuser@($public_ip)" $commands
}
