<?php

/**
 * Callback for oauth2 login
 * @author Kieran Knowles
 * Based on week 11 workshop code by Kay Rogage
 */

// Boilerplate code to get a client ready
require_once __DIR__ . '/vendor/autoload.php';
session_start();

$client = new Google\Client();
$client->setAuthConfig(__DIR__ . '/client_secrets.json');
// Set the URL that the user will be redirected back to after they log in
// This will be passed a code that can be exchanged for an access token
$host = $_SERVER['HTTP_HOST'];
$redirect = "https://$host/oauth2callback.php";
$client->setRedirectUri(filter_var($redirect, FILTER_SANITIZE_URL));

// Ask for the user's email when they log in
$client->addScope('https://www.googleapis.com/auth/userinfo.email');

$code = $_GET['code'] ?? null;
if ($code !== null) {
    // We have an auth code, exchange it for an access token and store it in the session
    $client->authenticate($code);
    $_SESSION['access_token'] = $client->getAccessToken();
    // Redirect back to the login page
    header("Location: /login.php");
} else {
    // We don't have an auth code, go to oauth2 login
    $auth_url = $client->createAuthUrl();
    header("Location: " . filter_var($auth_url, FILTER_SANITIZE_URL));
}
