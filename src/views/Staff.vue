<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<div class="d-flex align-items-center">
						<h4 class="card-title">Tabel Staff</h4>
						<BaseButton @event-click="showHideModal" class="btn-primary btn-round ml-auto">
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
										<label>Search:<input @keyup="getStaff" v-model="meta.search" type="search"
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
													aria-label="Position: activate to sort column ascending" style="width: auto;">Jabatan
												</th>
												<th style="width: 8%;" class="sorting" tabindex="0" aria-controls="add-row" rowspan="1"
													colspan="1" aria-label="Action: activate to sort column ascending">Aksi</th>
											</tr>
										</thead>
										<tbody>
											<tr v-for="(staff, index) in payloadList" :key="index" role="row" class="odd">
												<td class="sorting_1">{{ staff.nama }}</td>
												<td>{{ staff.jabatan }}</td>
												<td>
													<div class="form-button-action">
														<BaseButton data-toggle="tooltip" title="" class="btn-link btn-primary btn-lg"
															data-original-title="Edit Task">
															<i class="fa fa-edit"></i>
														</BaseButton>
														<BaseButton data-toggle="tooltip" title="" class="btn-link btn-danger"
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
						<label class="form-label">Jabatan</label>
						<BaseInput v-model="payload.jabatan" placeholder="Masukan disini..." />
						<span v-for="error in v$.jabatan.$errors" :key="error.$uid">
							<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
						</span>
					</div>
				</div>
			</div>
		</template>
		<template v-slot:footer>
			<BaseButton @event-click="upsertStaff" class="btn-primary rounded mr-2">Proses</BaseButton>
			<BaseButton data-dismiss="modal" aria-label="Close" class="btn-danger rounded">Batal</BaseButton>
		</template>
	</BaseModal>
</template>
<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Staff from '../utils/Staff'
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
const getStaff = () => {
	Staff.getAll(meta)
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
	jabatan: ''
})

const myRegex = helpers.regex(/^[\w\s\d-\.]+$/d)
const rules = computed(() => {
	return {
		nama: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
		jabatan: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		}
	}
})
const v$ = useVuelidate(rules, payload)

const upsertStaff = async () => {
	const validate = await v$.value.$validate()

	if (validate) {
		Staff.upsert(payload)
		.then((res) => {
			let item = res.data
			console.log(item)
		})
		.catch((err) => {
			console.log(err)
		})
	}
}

// Another function
// #####################################################

const pagginate = (params) => {
	meta.page = params
	getStaff()
}

// const modal = $('#myModal')

const showHideModal = (params) => {
	// modal.modal('show') ? modal.modal('show') : modal.modal('hide')
	$('#myModal').modal('show')
}

onMounted(() => {
	getStaff()
})
</script>