---
title: Weather
---

@extends('layouts.layout')

@section('head')
    <script type="module" src="/js/weather.js" defer></script>
@endsection

@section('content')
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
@endsection
