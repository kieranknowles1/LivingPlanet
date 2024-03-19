# Deployment script for the infrastructure
def main [
    --update # Download the latest source code and update the website
] {
    if $update {
        update
    } else {
        deploy
    }
}

def deploy [] {
    # Only strictly required on first deployment. Install any required providers
    terraform init

    # Plan the deployment.
    terraform plan -out main.tfplan

    # This is where you would review the plan if doing a manual deployment
    # Generate a graph of the deployment
    terraform graph | save graph.dot --force

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
    let src_remote_path = $"/tmp/src_(random int).zip"

    # Zip the source code
    do {
        cd src/html
        ^zip -r ../../src.zip .
    }
    # Upload via SCP
    scp src.zip $"azureuser@($fqdn):($src_remote_path)"

    let commands = [
        "echo 'Removing the old source code'"
        "sudo rm -rf /var/www/html/*",
        "sudo rm /var/www/html/.htaccess",
        "echo 'Unzipping the new source code'"
        $"sudo unzip ($src_remote_path) -d /var/www/html"
    ] | str join " && "

    # This will not prompt for a password unless your SSH key is password protected
    # Run the commands and exit. Output will be streamed to the console
    ssh $"azureuser@($fqdn)" $commands
}
