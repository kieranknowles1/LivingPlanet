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

    <section>
        <h2>Air Quality</h2>
        <p>Key: <span id="airQualityKey"></span></p>
        <p>Air Quality Index: <span id="airQualityIndex"></span> (<span id="airQualityDescription"></span>)</p>
        <p>Carbon Monoxide: <span id="co"></span> µg/m³</p>
        <p>Nitrogen Monoxide: <span id="no"></span> µg/m³</p>
        <p>Nitrogen Dioxide: <span id="no2"></span> µg/m³</p>
        <p>Ozone: <span id="o3"></span> µg/m³</p>
        <p>Sulphur Dioxide: <span id="so2"></span> µg/m³</p>
        <p>Ammonia: <span id="nh3"></span> µg/m³</p>
        <p>Particulates (2.5 µm): <span id="pm2_5"></span> µg/m³</p>
        <p>Particulates (10 µm): <span id="pm10"></span> µg/m³</p>
    </section>
</body>
</html>
