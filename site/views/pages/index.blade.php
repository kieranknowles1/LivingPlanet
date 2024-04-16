---
title: Home
---

@extends('layouts.layout')

@section('head')
	<!-- Not bothered about putting the API key here as it's restricted to the domain, the key is free, and it's linked to a card with £0.22 on it -->
    <script
		defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk0ovRwzRYtQfLcraqO5rGM3-adTsGTnM&callback=console.debug&libraries=maps,marker&v=3.56&loading=async"
	></script>
	<script src="/js/index.js" defer></script>
@endsection

@section('content')
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
