<template>
	<!-- Logo Header -->
	<div class="logo-header" data-background-color="blue2">

		<a href="index.html" class="logo">
		</a>
		<button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse"
			aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon">
				<i class="icon-menu"></i>
			</span>
		</button>
		<button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
		<div class="nav-toggle">
			<button class="btn btn-toggle toggle-sidebar">
				<i class="icon-menu"></i>
			</button>
		</div>
	</div>
	<!-- End Logo Header -->

	<!-- Navbar Header -->
	<nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

		<div class="container-fluid">
			<div class="collapse" id="search-nav">

			</div>
			<ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
				<li class="nav-item toggle-nav-search hidden-caret">
					<a class="nav-link" data-toggle="collapse" href="#search-nav" role="button" aria-expanded="false"
						aria-controls="search-nav">
						<i class="fa fa-search"></i>
					</a>
				</li>
				<li class="nav-item dropdown hidden-caret">
					<h2 class="text-light"><b>UNIT MANAJEMEN DISPOSISI</b></h2>
				</li>
			</ul>
		</div>
	</nav>
	<!-- End Navbar -->
</template>
<script setup>
	const logoImage = ''
</script>