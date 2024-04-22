<?php (require_once('phar://C:/Users/Student/AppData/Roaming/Composer/vendor/xy2z/capro/capro.phar/src/blade_helpers.php')); ?>



<?php $__env->startSection('head'); ?>
    <script type="module" src="/js/weather.js" defer></script>
<?php $__env->stopSection(); ?>

<?php $__env->startSection('content'); ?>
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
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.layout', _HumbugBox26cc824768c9\Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\src\UniStuff\LivingPlanet\site\views/__tmp.blade.php ENDPATH**/ ?>