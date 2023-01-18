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
										<h1 class="mt-3 pb-1 mb-4 fw-bold flex-grow-1">Selamat Datang</h1>
										<img src="../../src/assets/img/untad.png" class="mb-4 mr-3" alt=""
											style="width: 70px; margin-left: 260px;">
									</div>
									<div class="d-flex mb-1">
										<span>Silahkan lihat masukan kode tiket untuk melihat status progress</span>
									</div>
									<div class="d-flex">
										<div class="float-left flex-grow-1">
											<input v-model="noStambuk" type="text" class="form-control" placeholder="Search for...">
										</div>
										<div class="float-right">
											<BaseButton @event-click="getTicketStatus" class="btn-primary ml-3">Search</BaseButton>
										</div>
									</div>
									<div class="row p-3">
										<table v-if="ticketList.length >= 1" class="table table-bordered">
											<thead>
												<tr>
													<th scope="col">No. Ticket</th>
													<th scope="col">Nama</th>
													<th scope="col">Prodi</th>
													<th scope="col">Status</th>
													<th style="width: 15% !important;" class="text-center" scope="col">Tanggal Pengajuan</th>
												</tr>
											</thead>
											<tbody>
												<tr v-for="(ticket, index) in ticketList" :key="index">
													<td>{{ ticket.no_tiket }}</td>
													<td>{{ ticket.nama_mahasiswa }}</td>
													<td>{{ ticket.prodi }}</td>
													<td>{{ ticket.verifikasi ? 'Disetujui' : 'Belum Disetujui' }}</td>
													<td class="text-center">
														<span class="pt-2">{{ moment(ticket.created_at).format('DD MMMM, YYYY') }}</span>
														<span v-if="(scopeCheck() === 'crud-list' || scopeCheck() === 'validate-list') && !ticket.verifikasi" class="ml-2 float-right my-2">
															<BaseButton @event-click="updateStatus" :data-rows="ticketList[index]" class="btn-light btn-sm px-5">Setujui</BaseButton>
														</span>
													</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Footer />
	</div>
</template>

<script setup>
import { ref } from 'vue';
import moment from 'moment';
import StatusTicket from '../utils/StatusTicket';
import Ticket from '../utils/Ticket';
import AuthCheck from '../utils/AuthCheck';
import SweetAlert from '../utils/SweetAlert';
import BaseButton from '../components/Button/BaseButton.vue';
import Footer from '../components/skelton/Footer.vue';
import SideBar from '../components/skelton/SideBar.vue';
import TopBar from '../components/skelton/TopBar.vue';


const noStambuk = ref('')
const ticketList = ref([])

const getTicketStatus = () => {
	ticketList.value = []
	StatusTicket.getStatus({
		no_tiket: noStambuk.value
	})
		.then((res) => {
			let item = res.data
			ticketList.value = item.data
		})
		.catch((err) => {
			if (err.response.status) {
				alert('Data not found')
				noStambuk.value = ''
			}
		})
}

const updateStatus = (params) => {
	let data = params.dataRows
	SweetAlert.alertConfirm({
		title: "Setujui Tiket?",
		confirmtext: "Setujui"
	})
	.then((res) => {
		if (res.isConfirmed) {
			Ticket.upsert({
				id: data.id,
				id_mahasiswa: data.id_mahasiswa,
				id_staff: data.id_staff,
				keterangan: data.keterangan,
				verifikasi: 1
			})
			.then((response) => {
				getTicketStatus()
				alert('Tiket disetujui !')
			});
		}
	})
}

const scopeCheck = () => {
	return AuthCheck.rolesCheck()
}
</script>