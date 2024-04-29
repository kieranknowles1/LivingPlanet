<?php
/**
 * @author Kieran Knowles
 * Based on week 11 workshop code by Kay Rogage
 * and the readme from https://github.com/googleapis/google-api-php-client
 */

// Configure autoloading for any composer dependencies
require_once __DIR__ . '/vendor/autoload.php';

// Track user session between requests
session_start();

$client = new Google\Client();
$client->setAuthConfig(__DIR__ . '/client_secrets.json');

// Check if the user is already logged in
$token = $_SESSION['access_token'] ?? null;
if ($token !== null) {
    $client->setAccessToken($token);
} else {
    // If not logged in, go to OAuth to log in
    $host = $_SERVER['HTTP_HOST'];
    $callback = "https://$host/oauth2callback.php";
    $client->setRedirectUri($callback);

    // We only need the user's email address
    $client->addScope('https://www.googleapis.com/auth/userinfo.email');

    $authUrl = $client->createAuthUrl();
    header("Location: " . filter_var($authUrl, FILTER_SANITIZE_URL));

    // Exit early so we don't return the rest of the page
    exit();
}

// Signing out triggers a POST request to this page with signOut=true
// We can then revoke the token with Google, and clear server-side session data
$signOutRequest = $_SERVER['REQUEST_METHOD'] === 'POST' && ($_POST['signOut'] ?? false);
if ($signOutRequest) {
    // Revoke the token
    $client->revokeToken();
    // Clear the session
    session_destroy();
    // Redirect to the home page
    header("Location: /");
    exit();
}

// Get the user's email address. This is one of the scopes we requested
$service = new Google\Service\Oauth2($client);
$email = $service->userinfo->get()->email;

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="/images/favicon.svg">
</head>

<body>
    <header>
        <h1>Login</h1>
        <?php require 'components/navigation.php'; ?>
    </header>

    <section>
        <h2>What is OAuth?</h2>
        <p>
            OAuth allows users to grant a site such as this one access to parts
            of their accounts with external services without sharing their passwords.

            This is done by redirecting to a service's login page, which then sends the
            user back to the site with a code that can be used to create a token and
            access the data that was allowed, such as your email address, which is
            <strong><?php echo $email; ?></strong>.
        </p>
    </section>

    <form method="post">
        <!-- This will make a POST request to this page with signOut=true -->
        <button type="submit" name="signOut" value="true">Sign Out</button>
    </form>

    <?php require ('components/footer.php'); ?>
</body>

</html>
