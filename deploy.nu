#!/usr/bin/env nu

# Deployment script for the infrastructure
def main [
    --update (-u) # Download the latest source code and update the website
    --destroy (-d) # Destroy the infrastructure
] {
    if $destroy {
        destroy
    } else {
        if (not $update) {
            deploy
            # Let the VM boot before SSHing in
            sleep 30sec
        }
        upload_src

        print "Deployment complete."
        print $"You can access the website at: http://(terraform output -raw fqdn)"
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

    # The old SSH signature will be invalid, so we need to remove it
    ssh-keygen -R $"(terraform output -raw fqdn)"
}

def upload_src [] {
    print "Uploading source code to the VM..."
    print "You may have to enter your SSH password and/or accept the host key. Your input will not be echoed to the console"

    let ssh_string = terraform output -raw ssh_string
    let src_local_path = $"(pwd)/src.zip"
    let src_remote_path = $"/tmp/src_(random int).zip"

    # Zip the source code. We CD first to avoid including the full path in the zip
    do {
        cd src/html
        ^zip -r $src_local_path . -x "vendor/*"
    }
    # Upload via SCP
    scp $src_local_path $"($ssh_string):($src_remote_path)"

    # /var/www/html is owned by www-data, but we are running as azureuser
    # So we neet to run everything as root then give ownership back to www-data
    let commands = [
        # We need to run unzip and composer, which are installed during cloud-init
        # By waiting for the dpkg lock to be released, we ensure that these are installed which
        # avoids a race condition. Apt-get is the first stage of the userdata script, and we already
        # waited to let the VM boot, so this should be safe
        "echo 'Waiting for apt-get to complete'",
        "while sudo fuser /var/lib/dpkg/lock >/dev/null 2>&1; do sleep 1; done",
        "echo 'Removing the old source code'"
        "sudo rm -rf /var/www/html/*",
        # Delete the .htaccess file, but don't care if it doesn't exist
        "sudo rm /var/www/html/.htaccess || true",
        "echo 'Unzipping the new source code'"
        $"sudo unzip ($src_remote_path) -d /var/www/html"
        "echo 'Setting permissions'"
        "sudo chown -R www-data:www-data /var/www/html",
        "echo 'Installing dependencies'"
        "cd /var/www/html"
        "sudo -u www-data composer install"
    ] | str join " && "

    # This will not prompt for a password unless your SSH key is password protected
    # Run the commands and exit. Output will be streamed to the console
    ssh $ssh_string $commands
}

def destroy [] {
    # Plan takedown
    terraform plan -destroy -out .\main.destroy.tfplan
    # Apply the takedown
    terraform apply .\main.destroy.tfplan
}
