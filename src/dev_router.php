<?php
/**
 * Very basic router for use with PHP's built-in server. Utterly unsuitable for production.
 * Usage: php -S localhost:80 dev_router.php
 */
$uri = $_SERVER['REQUEST_URI'];
if (file_exists("./html/$uri") && !is_dir("./html/$uri")) {
    $uri = "./html/$uri";
} else if ($uri === '/' || $uri === '') {
    $uri = './html/index.php';
} else {
    $uri = "./html/$uri.php";
}

// Set the content type based on the file extension to make the browser happy
// Again, a production router would need to be much more sophisticated
if (str_ends_with($uri, '.css')) {
    header('Content-Type: text/css');
} else if (str_ends_with($uri, '.js')) {
    header('Content-Type: text/javascript');
}

require $uri;
