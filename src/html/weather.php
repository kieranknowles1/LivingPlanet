<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="favicon.svg">
    <?php require 'components/jquery.php'; ?>
    <script src="weather.js" defer></script>
    <title>Weather</title>
</head>
<body>
    <h1>Weather</h1>
    <?php require 'components/navigation.php'; ?>

    <section>
        <h2>Current Weather</h2>
        <p>Description: <span id="description"></span></p>
        <p>Temperature: <span id="temperature"></span>°C</p>
        <p>Wind Speed: <span id="windSpeed"></span> m/s</p>
    </section>
</body>
</html>
