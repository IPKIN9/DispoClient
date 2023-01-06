<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<div class="d-flex align-items-center">
						<h4 class="card-title">Tabel Mahasiswa</h4>
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
										<label>Search:<input @keyup="getMahasiswa" v-model="meta.search" type="search"
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
													style="width: 50%;">Nama</th>
												<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
													aria-label="Position: activate to sort column ascending" style="width: auto;">Stambuk
												</th>
                                                <th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
													aria-label="Position: activate to sort column ascending" style="width: auto;">Program Studi
												</th>
                                                <th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
													aria-label="Position: activate to sort column ascending" style="width: auto;">Fakultas
												</th>
												<th style="width: 8%;" class="sorting" tabindex="0" aria-controls="add-row" rowspan="1"
													colspan="1" aria-label="Action: activate to sort column ascending">Aksi
                                                </th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(mahasiswa, index) in payloadList" :key="index" role="row" class="odd">
												<td class="sorting_1">{{ mahasiswa.nama }}</td>
												<td>{{ mahasiswa.stambuk }}</td>
                                                <td>{{ mahasiswa.prodi }}</td>
                                                <td>{{ mahasiswa.fakultas }}</td>
												<td>
													<div class="form-button-action">
														<BaseButton @event-click="editMahasiswa" :dataRows="payloadList[index]" data-toggle="tooltip" title="" class="btn-link btn-primary btn-lg"
															data-original-title="Edit Task">
															<i class="fa fa-edit"></i>
														</BaseButton>
														<BaseButton @event-click="deleteMahasiswa" :data-id="mahasiswa.id" data-toggle="tooltip" title="" class="btn-link btn-danger"
															data-original-title="Remove">
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
	<BaseModal title="Manage data" id-modal="myModal">
		<template v-slot:body>
			<div class="row">
				<div class="col-lg-12">
					<div class="form-group">
						<label class="form-label">Nama Lengkap</label>
						<BaseInput v-model="payload.nama" placeholder="Masukan disini..." />
						<span v-for="error in v$.nama.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>	
					<div class="form-group">
						<label class="form-label">Stambuk</label>
						<BaseInput v-model="payload.stambuk" placeholder="Masukan disini..." />
						<span v-for="error in v$.stambuk.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
                    <div class="form-group">
						<label class="form-label">Prodi</label>
						<BaseInput v-model="payload.prodi" placeholder="Masukan disini..." />
						<span v-for="error in v$.prodi.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
                    <div class="form-group">
						<label class="form-label">Fakultas</label>
						<BaseInput v-model="payload.fakultas" placeholder="Masukan disini..." />
						<span v-for="error in v$.fakultas.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<BaseButton @event-click="upsertMahasiswa" class="btn-primary rounded mr-2">Proses</BaseButton>
			<BaseButton @event-click="showHideModal" class="btn-danger rounded">Batal</BaseButton>
		</template>
	</BaseModal>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Mahasiswa from '../utils/Mahasiswa'
import SweetAlert from '../utils/SweetAlert'
import BaseButton from '../components/Button/BaseButton.vue'
import Short from '../components/Button/Short.vue'
import Paggination from '../components/Paggination.vue'
import BaseModal from '../components/BaseModal.vue'
import BaseInput from '../components/Input/BaseInput.vue'

const meta = reactive({
	limit: 10,
	page: 1,
	total: 0,
	search: ''
})

const payloadList = ref([])

// Get data
// #####################################################
const getMahasiswa = () => {
	Mahasiswa.getAll(meta)
		.then((res) => {
			let item = res.data
			payloadList.value = item.data
			meta.total = item.meta.total
		})
		.catch((err) => {
			console.log(err)
		})
}

// Upsert data
// #####################################################
const payload = reactive({
	nama: '',
	stambuk: '',
    prodi: '',
    fakultas: ''
})

const myRegex = helpers.regex(/^[\w\s\d-\.]+$/d)
const rules = computed(() => {
	return {
		nama: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		stambuk: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
        prodi: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
        fakultas: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		}
	}
})
const v$ = useVuelidate(rules, payload)

const upsertMahasiswa = async () => {
	const validate = await v$.value.$validate()

	if (validate) {
		Mahasiswa.upsert(payload)
		.then((res) => {
			let item = res.data
			showHideModal()
			successAlert(item.message)
		})
		.catch((err) => {
			console.log(err)
		})
	}
}

// Edit function
// #####################################################
const editMahasiswa = (params) => {
	for (const key in params.dataRows) {
		payload[key] = params.dataRows[key]
	}
	payload.id = params.dataRows['id']
	showHideModal()
}

// Delete function
// #####################################################
const deleteMahasiswa = (params) => {
	SweetAlert.alertConfirm({
		title: 'Hapus Data',
		confirmtext: 'Yes'
	})
	.then((res) => {
		if (res.isConfirmed) {
			Mahasiswa.delete(params.dataId)
			.then((sucess) => {
				let item = sucess.data
				successAlert(item.message)
			})
			.catch((err) => {
				console.log(err)
			})
		}
	})
}

// Another function
// #####################################################

const pagginate = (params) => {
	meta.page = params
	getMahasiswa()
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
			getMahasiswa()
			clearInput()
		}
	})
	.catch((err) => {
		console.log(err)
	})
}

const clearInput = () => {
	v$.value.$reset()
	for (const key in payload) {
		payload[key] = ''
	}
	delete payload.id
}

onMounted(() => {
	getMahasiswa()
})
</script>