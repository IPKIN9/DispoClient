<template>
	<div class="sidebar" data-background-color="white">
		<div class="sidebar-wrapper scrollbar scrollbar-inner">
			<div class="sidebar-content">
				<ul class="nav nav-primary">
					<li class="nav-item">
						<BaseLink :link-to="{name: 'dashboard'}">
							<i class="fas fa-home"></i>
							<p>Dashboard</p>
						</BaseLink>
					</li>
					<li class="nav-section">
						<span class="sidebar-mini-icon">
							<i class="fa fa-ellipsis-h"></i>
						</span>
						<h4 class="text-section">Data</h4>
					</li>
					<li class="nav-item">
						<BaseLink :link-to="{name: 'staff'}">
							<i class="la flaticon-suitcase"></i>
							<p>Staff</p>
						</BaseLink>
					</li>
					<li class="nav-item">
						<BaseLink :link-to="{name: 'mahasiswa'}">
						<i class="la flaticon-users"></i>
							<p>Mahasiswa</p>
						</BaseLink>
					</li>
					<li class="nav-item">
						<BaseLink :link-to="{name: 'ticket'}">
							<i class="la flaticon-price-tag"></i>
							<p>Ticket</p>
						</BaseLink>
					</li>
					<li class="nav-item">
						<a href="widgets.html">
							<i class="la flaticon-user-5"></i>
							<p>Account</p>
						</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup>
	import BaseLink from '../Button/BaseLink.vue'
</script>