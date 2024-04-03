<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="/img/favicon.svg">
    <!-- Not bothered about putting the API key here as it's restricted to the domain, the key is free, and it's linked to a card with £0.22 on it -->
    <?php require 'components/jquery.php'; ?>
    <script async src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk0ovRwzRYtQfLcraqO5rGM3-adTsGTnM&callback=console.debug&libraries=maps,marker&v=beta&loading=async">
    </script>
    <script src="js/index.js" defer></script>
    <title>Living Planet</title>
</head>
<body>
    <header>
        <h1>Living Planet</h1>
        <?php require 'components/navigation.php'; ?>
    </header>
    <main class="map-container" id="map">
        <h2>Map</h2>
    </main>
</body>
</html>
