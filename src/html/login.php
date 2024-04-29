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
if ($token) {
    $client->setAccessToken($token);
} else {
    // If not, redirect to the callback URL which handles the OAuth flow
    $host = $_SERVER['HTTP_HOST'];
    $callback = filter_var("http://$host/oauth2callback", FILTER_SANITIZE_URL);
    header("Location: " . $callback);

    // Exit early so we don't return the rest of the page
    exit();
}


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
    </section>

    <form method="post">
        <!-- This will make a POST request to this page with signOut=true -->
        <button type="submit" name="signOut" value="true">Sign Out</button>
    </form>

    <?php require ('components/footer.php'); ?>
</body>

</html>
