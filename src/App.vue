<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from './components/skelton/SideBar.vue'
import TopBar from './components/skelton/TopBar.vue'
</script>

<template>
	<div class="wrapper sidebar_minimize">
		<div class="main-header">
			<TopBar />
		</div>

		<!-- Sidebar -->
		<SideBar />
		<!-- End Sidebar -->

		<div class="main-panel">
			<div class="content">
				<div class="page-inner">

					<RouterView />

				</div>
			</div>
			<footer class="footer">
				<div class="container-fluid">
					<nav class="pull-left">
						<ul class="nav">
							<li class="nav-item">
								<a class="nav-link" href="#">
									Github
								</a>
							</li>
						</ul>
					</nav>
					<div class="copyright ml-auto">
						2023, <a href="https://www.themekita.com"> ForYou Team</a>
					</div>
				</div>
			</footer>
		</div>
	</div>
</template>
