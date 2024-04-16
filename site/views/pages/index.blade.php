---
title: Home
---

@extends('layouts.layout')

@section('head')
	<!-- Not bothered about putting the API key here as it's restricted to the domain, the key is free, and it's linked to a card with £0.22 on it -->
    <script
		defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk0ovRwzRYtQfLcraqO5rGM3-adTsGTnM&callback=console.debug&libraries=maps,marker&v=3.56&loading=async&callback=onMapsLoaded"
	></script>
	<script type="module" src="/js/index.js" defer></script>
@endsection

@section('content')
	<template id="weather-widget-template">
		<details class="weather-widget" open>
			<summary><span class="location"></span>, <span class="temperature"></span>°C, <span class="description"></span>, <span class="wind-speed"></span> m/s wind</summary>
			<section>
				<h3>Air Quality</h3>
				<p>Key: <span class="key"></span></p>
				<p>Air Quality Index: <span class="airQualityIndex"></span> (<span class="airQualityDescription"></span>)</p>
				<p>Carbon Monoxide: <span class="co"></span> µg/m³</p>
				<p>Nitrogen Monoxide: <span class="no"></span> µg/m³</p>
				<p>Nitrogen Dioxide: <span class="no2"></span> µg/m³</p>
				<p>Ozone: <span class="o3"></span> µg/m³</p>
				<p>Sulphur Dioxide: <span class="so2"></span> µg/m³</p>
				<p>Ammonia: <span class="nh3"></span> µg/m³</p>
				<p>Particulates (2.5 µm): <span class="pm2_5"></span> µg/m³</p>
				<p>Particulates (10 µm): <span class="pm10"></span> µg/m³</p>
			</section>
		</details>
	</template>
	<weather-widget lat="51.5074" lon="-0.1278"></weather-widget>
	<section>
		<h2>Map</h2>
		{{-- TODO: All of the navigation stuff should be removed for the final version --}}
		<input id="from" type="text" placeholder="From" />
		<input id="to" type="text" placeholder="To" />
		<select id="method">
			<option value="DRIVING">Driving</option>
			<option value="WALKING">Walking</option>
			<option value="BICYCLING">Cycling</option>
			<option value="TRANSIT">Public Transport</option>
		</select>
		<button id="directions">Get Directions</button>
		<button id="distance">Get Distance</button>
		<div class="map-container" id="map"></div>
		<div id="directions-panel"></div>
		<div id="distance-panel"></div>
	</section>
@endsection
