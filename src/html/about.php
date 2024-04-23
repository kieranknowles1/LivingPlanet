<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="icon" href="/images/favicon.svg">
    <title>About</title>
</head>
<body>
    <header>
        <h1>About</h1>
        <?php require 'components/navigation.php'; ?>
    </header>

    <section>
        <h2>Developer Information</h2>
        <p>
            Developed by Kieran Knowles, student number w20013000, as part of the
            KF6013 Cloud Computing and Web API Programming module at Northumbria
            University.
        </p>
    </section>

    <section>
        <h2>Tools Used</h2>
        <p>
            The following third-party tools, frameworks, and libraries were
            used to create and deploy this website:
        </p>
        <ul>
            <li><a href="https://azure.microsoft.com/">Microsoft Azure</a> - Cloud Provider</li>
            <li><a href="https://code.visualstudio.com/">Visual Studio Code</a> - IDE</li>
            <li><a href="https://eslint.org/">ESLint</a> - JavaScript Linter</li>
            <li><a href="https://git-scm.com/">Git</a> - Version Control</li>
            <li><a href="https://httpd.apache.org/">Apache HTTP Server</a> - Web Server</li>
            <li><a href="https://jquery.com/">jQuery</a> - JavaScript Library</li>
            <li><a href="https://nushell.sh/">Nu Shell</a> - Shell, used to make cross-platform scripts for automation</li>
            <li><a href="https://standardjs.com/">StandardJS</a> - JavaScript Style Guide</li>
            <li><a href="https://terraform.io/">Terraform</a> - Infrastructure as Code</li>
            <li><a href="https://www.php.net/">PHP</a> - Server-Side Scripting Language</li>
        </ul>
    </section>

    <section>
        <h2>Client-Side Libraries</h2>
        <p>
            The following client-side libraries were used to create the
            front-end of this website:
        </p>
        <ul>
            <li><a href="https://developers.google.com/maps/documentation/javascript/overview">Google Maps JavaScript API</a> - Map & all icons within the map</li>
            <li><a href="https://jquery.com/">jQuery 3.7.1</a> - JavaScript Library</li>
            <li><a href="https://openweathermap.org/api">OpenWeatherMap API</a> - Weather and pollution data</li>
        </ul>
    </section>
    <section>
        <h2>Information Sources</h2>
        <p>
            The following sources were used to gather information for the
            website:
        </p>
        <ul>
            <li><a href="https://airindex.eea.europa.eu/AQI/index.html">European Environment Agency Air Quality Index</a>. Licensed under <a href="https://www.eea.europa.eu/en/legal-notice">CC BY 4.0</a></li>
            <li><a href="https://www.eea.europa.eu/en/topics/in-depth/air-pollution/eow-it-affects-our-health">EEA Article on Air Pollution</a>. Licensed under <a href="https://www.eea.europa.eu/en/legal-notice">CC BY 4.0</a></li>
            <li><a href="https://www.nhs.uk/conditions/carbon-monoxide-poisoning/">NHS Article on Carbon Monoxide Poisoning</a></li>. Licensed under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL v3.0</a>
            <li><a href="https://www.gov.uk/government/publications/ammonia-properties-incident-management-and-toxicology">UK Government Article on Ammonia</a>. Licensed under <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">OGL v3.0</a>
        <ul>
    </section>
    <?php require('components/footer.php'); ?>
</body>
</html>
