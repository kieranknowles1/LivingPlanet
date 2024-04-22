<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title><?php echo e($title); ?> - <?php echo e(config('app.title')); ?></title>
		<link rel="stylesheet" href="/css/style.css">
    	<link rel="icon" href="/img/favicon.svg">
		<script
			src="https://code.jquery.com/jquery-3.7.1.min.js"
			integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo="
			crossorigin="anonymous"
			defer
		></script>
		<?php echo $__env->yieldContent('head'); ?>
	</head>

	<body>
		<h1><?php echo e($title); ?></h1>
		<nav>
			<ul>
				<?php $__currentLoopData = config('app.links'); $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $title => $url): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
					<li><a href="<?php echo e($url); ?>"><?php echo e($title); ?></a></li>
				<?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
			</ul>
		</nav>
		<main>
			<?php echo $__env->yieldContent('content'); ?>
		</main>
	</body>

	<footer>
    	<p>© 2024 Kieran Knowles</p>
	</footer>
</html>

<?php /**PATH C:\src\UniStuff\LivingPlanet\site\views/layouts/layout.blade.php ENDPATH**/ ?>