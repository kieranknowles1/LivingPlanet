---
title: Home
---

@extends('layouts.layout')

@section('head')
	<!-- Not bothered about putting the API key here as it's restricted to the domain, the key is free, and it's linked to a card with £0.22 on it -->
    <script
		defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBk0ovRwzRYtQfLcraqO5rGM3-adTsGTnM&callback=console.debug&libraries=maps,marker&v=beta&loading=async"
	></script>
	<script src="/js/index.js" defer></script>
@endsection

@section('content')
	<section class="map-container" id="map">
		<h2>Map</h2>
	</section>
@endsection
