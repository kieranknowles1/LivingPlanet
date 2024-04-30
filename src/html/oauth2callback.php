<?php

/**
 * Callback for oauth2 login.
 * The external service will redirect back to this page with an auth code
 * that we can exchange for an access token.
 * @author Kieran Knowles
 * Based on week 11 workshop code by Kay Rogage
 */

// Boilerplate code to get a client ready
require_once __DIR__ . '/vendor/autoload.php';
session_start();

$client = new Google\Client();
$client->setAuthConfig(__DIR__ . '/client_secrets.json');

$code = $_GET['code'] ?? null;

if ($code === null) {
    // If the code is not present, we assume the page was loaded directly
    // and not as a callback from the oauth2 login
    // Redirect to the home page
    header("Location: /");
} else {
    // We have an auth code, get an access token
    // and store it in the session
    $client->fetchAccessTokenWithAuthCode($code);
    $_SESSION['access_token'] = $client->getAccessToken();

    // Redirect back to the login page
    // This will now be visible to the user as they are logged in
    // A more sophisticated app could track the page the login was initiated from
    header("Location: /login");
}
