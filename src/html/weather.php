<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="/images/favicon.svg">
    <?php require 'components/jquery.php'; ?>
    <script type="module" src="js/weather.js" defer></script>
    <title>Weather</title>
</head>
<body>
    <h1>Weather</h1>
    <?php require 'components/navigation.php'; ?>

    <section>
        <h2>Current Weather for <span id="location"></span></h2>
        <p>Latitude: <span id="lat"></span>, Longitude: <span id="lon"></span></p>
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

    <section>
        <h2>About this Data</h2>
        <p>
            All data is provided by <a href="https://openweathermap.org">OpenWeatherMap</a>. The air quality index
            is determined according to the European Environment Agency's <a href="https://airindex.eea.europa.eu/AQI/index.html">Air Quality Index</a>.
        </p>
        <h3>Pollutants and Symptoms of Exposure</h3>
        <p>
            The following is the effect of each pollutant on the human body. See the <a href="/about">About</a> page for sources.
        <ul>
            <li><strong>Carbon Monoxide</strong> - Headaches, dizziness, feeling/being sick</li>
            <!-- NOTE: EEA says this can cause asthma, but the NHS says there's not enough evidence to support this, so I'm leaning on the side of caution -->
            <li><strong>Nitrogen Monoxide/Dioxide</strong> - Irritation, breathing difficulties, reduced lung function</li>
            <li><strong>Ozone</strong> - Irritation, cardiovascular (heart and blood) diseases</li>
            <li><strong>Sulphur Dioxide</strong> - Headaches, anxiety, cardiovascular diseases</li>
            <li><strong>Ammonia</strong> - Irritation, coughing, sore throat</li>
            <li><strong>Particulates</strong> - Breathing difficulties, nervous system impacts, lung cancer, reproductive issues</li>
        </ul>
    </section>
</body>
</html>
