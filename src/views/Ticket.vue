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
							<div class="card">
								<div class="card-header">
									<div class="d-flex align-items-center">
										<h4 class="card-title">Tabel Ticket</h4>
										<BaseButton @event-click="showHideModal('newData')" class="btn-primary btn-round ml-auto">
											<i class="fa fa-plus"></i>
											Tambah Data
										</BaseButton>
									</div>
								</div>
								<div class="card-body">
									<div class="table-responsive">
										<div id="add-row_wrapper" class="dataTables_wrapper container-fluid dt-bootstrap4">
											<div class="row">
												<div class="col-sm-12 col-md-6">
													<div class="dataTables_length" id="add-row_length">
														<Short v-model="meta.limit" />
													</div>
												</div>
												<div class="col-sm-12 col-md-6">
													<div id="add-row_filter" class="dataTables_filter">
														<label>Search:<input @keyup="getTicket" v-model="meta.search" type="search"
																class="form-control form-control-sm" placeholder="" aria-controls="add-row"></label>
													</div>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-12">
													<table id="add-row" class="display table table-striped table-hover dataTable" role="grid"
														aria-describedby="add-row_info">
														<thead>
															<tr role="row">
																<th class="sorting_asc" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
																	aria-sort="ascending" aria-label="Name: activate to sort column descending"
																	style="width: 15%;">No tiket</th>
																<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
																	aria-label="Position: activate to sort column ascending" style="width: auto;">Nama
																	Mahasiswa
																</th>
																<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
																	aria-label="Position: activate to sort column ascending" style="width: auto;">Staff
																</th>
																<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
																	aria-label="Position: activate to sort column ascending" style="width: auto;">
																	Keterangan
																</th>
																<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
																	aria-label="Position: activate to sort column ascending" style="width: auto;">
																	Verifikasi
																</th>
																<th style="width: 8%;" class="sorting" tabindex="0" aria-controls="add-row" rowspan="1"
																	colspan="1" aria-label="Action: activate to sort column ascending">Aksi
																</th>
															</tr>
														</thead>
														<tbody>
															<tr v-for="(ticket, index) in payloadList" :key="index" role="row" class="odd">
																<td class="sorting_1">{{ ticket.no_tiket }}</td>
																<td>{{ ticket.nama_mahasiswa }}</td>
																<td>{{ ticket.nama_staff }}</td>
																<td>{{ ticket.keterangan }}</td>
																<td v-if="ticket.verifikasi == true">
																	sudah
																</td>
																<td v-else="ticket.verifikasi == false">
																	Belum
																</td>
																<td>
																	<div class="form-button-action">
																		<BaseButton @event-click="editTicket" :dataRows="payloadList[index]"
																			data-toggle="tooltip" title="" class="btn-link btn-primary btn-lg"
																			data-original-title="Edit Task">
																			<i class="fa fa-edit"></i>
																		</BaseButton>
																		<BaseButton v-if="scopeCheck() === 'crud-list'" @event-click="deleteTicket" :data-id="ticket.id" data-toggle="tooltip"
																			title="" class="btn-link btn-danger" data-original-title="Remove">
																			<i class="fa fa-times"></i>
																		</BaseButton>
																	</div>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											<Paggination :pagging-data="meta" @click-event="pagginate" />
										</div>
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

	<BaseModal title="Manage data" id-modal="myModal">
		<template v-slot:body>
			<div class="row">
				<div class="col-lg-12">
					<div class="form-group">
						<label class="form-label">Nama Mahasiswa</label>
						<BaseInput v-model="mhsName" @keyup="getMhs" placeholder="Cari mahasiswa..." />

						<div v-show="mhsPayload.length >= 1" class="list-group list-group-flush">
							<button class="list-group-item list-group-item-action" v-for="(mhs, index) in mhsPayload" :key="index"
								@click.stop="changeMhsName({ id: mhs.id, nama: mhs.nama })">{{ mhs.nama }}</button>
						</div>
						<span v-for="error in v$.id_mahasiswa.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
					<div class="form-group">
						<label class="form-label">Staff</label>
						<BaseInput v-model="staffName" @keyup="getstaff" placeholder="Cari Staff..." />

						<div v-show="staffPayload.length >= 1" class="list-group list-group-flush">
							<button class="list-group-item list-group-item-action" v-for="(staff, index) in staffPayload" :key="index"
								@click.stop="changeStaffName({ id: staff.id, nama: staff.nama })">{{ staff.nama }}</button>
						</div>

						<span v-for="error in v$.id_staff.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
					<div class="form-group">
						<label class="form-label">Keterangan</label>
						<BaseInput v-model="payload.keterangan" placeholder="Masukan disini..." />
						<span v-for="error in v$.keterangan.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<BaseButton @event-click="upsertTicket" class="btn-primary rounded mr-2">Proses</BaseButton>
			<BaseButton @event-click="showHideModal" class="btn-danger rounded">Batal</BaseButton>
		</template>
	</BaseModal>
</template>
<script setup>
import { reactive, ref, onMounted, onBeforeMount, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Ticket from '../utils/Ticket'
import Mahasiswa from '../utils/Mahasiswa'
import Staff from '../utils/Staff'
import SweetAlert from '../utils/SweetAlert'
import AuthCheck from '../utils/AuthCheck'
import {useRouter} from 'vue-router'
import BaseButton from '../components/Button/BaseButton.vue'
import Short from '../components/Button/Short.vue'
import Paggination from '../components/Paggination.vue'
import BaseModal from '../components/BaseModal.vue'
import BaseInput from '../components/Input/BaseInput.vue'
import TopBar from '../components/skelton/TopBar.vue'
import SideBar from '../components/skelton/SideBar.vue'
import Footer from '../components/skelton/Footer.vue'

const router = useRouter()

const meta = reactive({
	limit: 10,
	page: 1,
	total: 0,
	search: ''
})

const payloadList = ref([])

// Get data
// #####################################################
const getTicket = () => {
	Ticket.getAll(meta)
		.then((res) => {
			let item = res.data
			payloadList.value = item.data
			meta.total = item.meta.total
		})
		.catch((err) => {
			let code = err.response.status
			errorHandle(code)
		})
}

// Upsert data
// #####################################################
const payload = reactive({
	id_mahasiswa: '',
	id_staff: '',
	keterangan: '',
	verifikasi: 0
})

const myRegex = helpers.regex(/^[\w\s\d-\.]+$/d)
const rules = computed(() => {
	return {
		id_mahasiswa: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		id_staff: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		keterangan: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		verifikasi: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		}
	}
})
const v$ = useVuelidate(rules, payload)

const upsertTicket = async () => {
	const validate = await v$.value.$validate()

	if (validate) {
		Ticket.upsert(payload)
			.then((res) => {
				let item = res.data
				showHideModal()
				successAlert(item.message)
			})
			.catch((err) => {
				let code = err.response.status
				errorHandle(code)
				console.log(err)
			})
	}
}

// Edit function
// #####################################################
const editTicket = (params) => {
	for (const key in params.dataRows) {
		if (key === 'nama_mahasiswa') {
			mhsName.value = params.dataRows['nama_mahasiswa']
		} else if (key === 'nama_staff') {
			staffName.value = params.dataRows['nama_staff']
		} else {
			payload[key] = params.dataRows[key]
		}
	}
	payload.id = params.dataRows['id']
	showHideModal()
}

// Delete function
// #####################################################
const deleteTicket = (params) => {
	SweetAlert.alertConfirm({
		title: 'Hapus Data',
		confirmtext: 'Yes'
	})
	.then((res) => {
		if (res.isConfirmed) {
			Ticket.delete(params.dataId)
			.then((sucess) => {
				let item = sucess.data
				successAlert(item.message)
			})
			.catch((err) => {
				let code = err.response.status
				errorHandle(code)
			})
		}
	})
}

// Another function
// #####################################################

const staffName = ref('');
const mhsName = ref('');
const staffPayload = ref([]);
const mhsPayload = ref([]);
const getstaff = () => {
	Staff.getAll({
		limit: 50,
		page: 1,
		search: staffName.value
	})
	.then((res) => {
		let item = res.data
		staffPayload.value = item.data
	})
	.catch((err) => {
		let code = err.response.status
		errorHandle(code);
	})
}

const getMhs = () => {
	Mahasiswa.getAll({
		limit: 50,
		page: 1,
		search: mhsName.value
	})
	.then((res) => {
		let item = res.data
		mhsPayload.value = item.data
	})
	.catch((err) => {
		let code = err.response.status
		errorHandle(code);
	})
}

const changeStaffName = (params) => {
	staffName.value = params.nama
	payload.id_staff = params.id

	staffPayload.value = []
}

const changeMhsName = (params) => {
	mhsName.value = params.nama
	payload.id_mahasiswa = params.id

	mhsPayload.value = []
}

const pagginate = (params) => {
	meta.page = params
	getTicket()
}

const showHideModal = (params) => {
	if (params === 'newData') {
		clearInput()
	}
	$('#myModal').modal('show') ? $('#myModal').modal('hide') : $('#myModal').modal('show')
}

const successAlert = (params) => {
	SweetAlert.alertSuccess(params)
	.then((res) => {
		if (res.isConfirmed) {
			getTicket()
			clearInput()
		}
	})
	.catch((err) => {
		let code = err.response.status
		errorHandle(code)
	})
}

const clearInput = () => {
	v$.value.$reset()
	for (const key in payload) {
		if (key === 'verifikasi') {
			payload[key] = false
		} else {
			payload[key] = ''
		}
	}
	delete payload.id

	staffName.value = ''
	mhsName.value = ''
}

const scopeCheck = () => {
	return AuthCheck.rolesCheck()
}

const errorHandle = (code) => {
	SweetAlert.alertError(AuthCheck.checkToken(code, goToLogin()))
}

const goToLogin = () => {
	router.replace('/login')			
}

onBeforeMount(() => {
	if (AuthCheck.checkToken() === 401) {
		goToLogin()
	}
})

onMounted(() => {
	getTicket()
})
</script>