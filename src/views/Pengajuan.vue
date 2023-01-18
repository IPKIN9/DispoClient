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
						<div class="col-lg-12">
							<div class="card">
								<div class="card-header">
									<h3><b>Form Pengajuan</b></h3>
								</div>
								<div class="card-body">
									<form class="row">
										<div class="col-md-12">
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
										</div>
										<div class="col-md-12">
											<div class="form-group">
												<label class="form-label">Keterangan</label>
												<textarea v-model="payload.keterangan" class="form-control" name="" id="" cols="30" rows="8">
                        </textarea>
												<span v-for="error in v$.keterangan.$errors" :key="error.$uid">
													<small class="text-danger text-lowercase">field {{ error.$message }}.</small>
												</span>
											</div>
											<button type="button" @click.stop="insertPengajuan" class="btn btn-primary ml-2 mt-2">Kirim</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { reactive, computed, onBeforeMount } from "vue";
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { useRouter } from 'vue-router'
import Pengajuan from "../utils/Pengajuan";
import SweetAlert from '../utils/SweetAlert'
import AuthCheck from '../utils/AuthCheck'
import BaseInput from "../components/Input/BaseInput.vue";
import SideBar from "../components/skelton/SideBar.vue";
import TopBar from "../components/skelton/TopBar.vue";

const router = useRouter()

const payload = reactive({
	nama: "",
  stambuk: "",
  prodi: "S1 Kehutanan",
  fakultas: "Kehutanan",
  keterangan: ""
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
		keterangan: {
			required,
			myField: helpers.withMessage('value cannot contain special characters', myRegex)
		},
	}
})
const v$ = useVuelidate(rules, payload)

const insertPengajuan = async () => {
	let validate = await v$.value.$validate()
	if (validate) {
		Pengajuan.createTicket(payload)
		.then((res) => {
			clearInput()
			SweetAlert.alertSuccess('Pengajuan berhasil')
		})
		.catch((err) => {
			let code = err.response.status
			errorHandle(code)
		})
	}
}

const clearInput = () => {
	for (const key in payload) {
		if (key === 'prodi' || key === 'fakultas') {
			continue
		}
		payload[key] = ''
	}
	v$.value.$validate()
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
</script>
