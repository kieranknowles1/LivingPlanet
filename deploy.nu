# Deployment script for the infrastructure
def main [
    --update # Download the latest source code and update the website
] {
    deploy

    if $update {
        update
    }
}

def deploy [] {
    # Only strictly required on first deployment. Install any required providers
    terraform init

    # Plan the deployment. Force reupload of the source code to the storage account
    terraform plan -replace="azurerm_storage_blob.html" -out main.tfplan

    # This is where you would review the plan if doing a manual deployment

    # Apply the deployment
    terraform apply main.tfplan

    print "Deployment complete. Please allow up to 5 minutes for setup to complete."
    print $"You can access the website at: http://(terraform output -raw fqdn)"
}

def update [] {
    # Plan and apply has uploaded the latest source code to the storage account
    # just need to SSH into the VM and pull the latest code
    print "Uploading the new source code to the VM..."
    print "You may have to enter your SSH password and/or accept the host key."

    let fqdn = terraform output -raw fqdn
    let blob_url = terraform output -raw src_blob_url

    let commands = [
        "echo 'Downloading the latest source code'"
        "sudo rm --force /tmp/src.zip",
        $"sudo wget -O /tmp/src.zip ($blob_url)",
        "echo 'Removing the old source code'"
        "sudo rm -rf /var/www/html/*",
        "echo 'Unzipping the new source code'"
        "sudo unzip /tmp/src.zip -d /var/www/html"
    ] | str join " && "

    # This will not prompt for a password unless your SSH key is password protected
    # Run the commands and exit. Output will be streamed to the console
    ssh $"azureuser@($fqdn)" $commands
}
