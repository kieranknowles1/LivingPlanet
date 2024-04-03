<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>{{ $title }} - {{ config('app.title') }}</title>
		<link rel="stylesheet" href="/css/style.css">
    	<link rel="icon" href="/img/favicon.svg">
		<script
			src="https://code.jquery.com/jquery-3.7.1.min.js"
			integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
			crossorigin="anonymous"
			defer
		></script>
		@yield('head')
	</head>

	<body>
		<h1>{{ $title }}</h1>
		<nav>
			<ul>
				@foreach (config('app.links') as $title => $url)
					<li><a href="{{ $url }}">{{ $title }}</a></li>
				@endforeach
			</ul>
		</nav>
		<main>
			@yield('content')
		</main>
	</body>

</html>

