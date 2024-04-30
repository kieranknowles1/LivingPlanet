<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="/images/favicon.svg">
    <!--
        Not bothered about putting the API key here as it's restricted to the domain, the key is free, and it's linked to a card with £0.22 on it
        We use the defer attribute to execute scripts in the order they appear in the document. This is important as each depends on the previous one.
        index.js uses jQuery, and maps uses onMapsLoaded from index.js
    -->
    <?php require 'components/jquery.php'; ?>
    <script type="module" src="js/index.js" defer></script>
    <script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk0ovRwzRYtQfLcraqO5rGM3-adTsGTnM&callback=console.debug&libraries=maps,marker&v=3.56&loading=async&callback=onMapsLoaded">
    </script>
    <title>Living Planet</title>
</head>
<body>
    <header>
        <h1>Living Planet</h1>
        <?php require 'components/navigation.php'; ?>
    </header>
    <main>
        <h2>Map</h2>
		<div class="map-container" id="map"></div>
		<div id="directions-panel"></div>
    </main>
</body>
</html>
