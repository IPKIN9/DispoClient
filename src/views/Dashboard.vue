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
					<div class="row">
						<div class="col-md-12">
							<div class="card card-primary bg-primary-gradient">
								<div class="card-body">
									<div class="d-flex">
										<h3 class="mt-3 pb-1 mb-4 fw-bold flex-grow-1">Data Ticket</h3>
										<img src="../../src/assets/img/untad.png" class="mb-4 mr-3" alt=""
											style="width: 70px; margin-left: 260px;">
									</div>
									<div class="row">
										<div class="col-md-11">
											<input type="text" class="form-control">
										</div>
										<a href="" class="btn btn-primary">Search</a>
									</div>
									<div class="row">
										<div class="col-sm-6">
											<div>
												<h4 class="mt-4 pb-2 mb-0 fw-bold">Data Mahasiswa</h4>
												<table width="300px" style="height: 130px;">
													<tr>
														<td>Nama</td>
														<td>:</td>
														<td>Nazar</td>
													</tr>
													<tr>
														<td>Stambuk</td>
														<td>:</td>
														<td>5520119031</td>
													</tr>
													<tr>
														<td>Program Studi</td>
														<td>:</td>
														<td>Teknik Informatika</td>
													</tr>
													<tr>
														<td>Fakultas</td>
														<td>:</td>
														<td>Teknik</td>
													</tr>
												</table>
											</div>
										</div>
										<div class="col-sm-6">
											<div>
												<h4 class="mt-4 pb-2 mb-0 fw-bold">Data Mahasiswa</h4>
												<table width="300px" style="height: 130px;">
													<tr>
														<td>Nama</td>
														<td>:</td>
														<td>Nazar</td>
													</tr>
													<tr>
														<td>Stambuk</td>
														<td>:</td>
														<td>5520119031</td>
													</tr>
													<tr>
														<td>Program Studi</td>
														<td>:</td>
														<td>Teknik Informatika</td>
													</tr>
													<tr>
														<td>Fakultas</td>
														<td>:</td>
														<td>Teknik</td>
													</tr>
												</table>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>

		<Footer/>
	</div>
</template>
<script setup>
import Footer from '../components/skelton/Footer.vue';
import SideBar from '../components/skelton/SideBar.vue';
import TopBar from '../components/skelton/TopBar.vue';

</script>