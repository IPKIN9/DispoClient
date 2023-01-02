<template>
	<div class="row">
		<div class="col-md-12">
			<div class="card">
				<div class="card-header">
					<div class="d-flex align-items-center">
						<h4 class="card-title">Tabel Staff</h4>
						<BaseButton class="btn-primary btn-round ml-auto">
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
										<label>Search:<input type="search" class="form-control form-control-sm" placeholder=""
												aria-controls="add-row"></label>
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
													style="width: 50%;">Name</th>
												<th class="sorting" tabindex="0" aria-controls="add-row" rowspan="1" colspan="1"
													aria-label="Position: activate to sort column ascending" style="width: auto;">Position
												</th>
												<th style="width: 8%;" class="sorting" tabindex="0" aria-controls="add-row" rowspan="1"
													colspan="1" aria-label="Action: activate to sort column ascending">Action</th>
											</tr>
										</thead>
										<tbody>
											<tr role="row" class="odd">
												<td class="sorting_1">Airi Satou</td>
												<td>Accountant</td>
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
</template>
<script setup>
import { reactive } from 'vue'
import BaseButton from '../components/Button/BaseButton.vue'
import Short from '../components/Button/Short.vue'
import Paggination from '../components/Paggination.vue'

const meta = reactive({
	limit: 10,
	page: 1,
	total: 50
})

const pagginate = (params) => {
	meta.page = params
}
</script>