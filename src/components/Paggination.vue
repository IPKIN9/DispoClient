<template>
	<div class="row mt-2">
		<div class="col-sm-12 col-md-5">
			<div class="dataTables_info" id="add-row_info" role="status" aria-live="polite">Showing {{ paggingData.page }} to
				{{ pageOff }} of {{ paggingData.total }}
				entries</div>
		</div>
		<div class="col-sm-12 col-md-7">
			<div class="dataTables_paginate paging_simple_numbers" id="add-row_paginate">
				<ul class="pagination">
					<li class="paginate_button page-item previous disabled" id="add-row_previous"><a role="button"
							aria-controls="add-row" data-dt-idx="0" tabindex="0" class="page-link">First</a></li>
					<li class="paginate_button page-item previous disabled" id="add-row_previous"><a role="button"
							aria-controls="add-row" data-dt-idx="0" tabindex="0" class="page-link">Previous</a></li>

					<li v-for="(button, index) in totalButton" :key="index" class="paginate_button page-item"
						:class="(paggingData.page === button ? 'active' : '')"><a @click="triggerButton(button)" role="button" aria-controls="add-row" data-dt-idx="1"
							tabindex="0" class="page-link">{{ button }}</a></li>

					<li class="paginate_button page-item next" id="add-row_next"><a role="button" aria-controls="add-row"
							data-dt-idx="3" tabindex="0" class="page-link">Next</a></li>
					<li class="paginate_button page-item next" id="add-row_next"><a role="button" aria-controls="add-row"
							data-dt-idx="3" tabindex="0" class="page-link">End</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, reactive } from 'vue'

const props = defineProps({
	paggingData: Object
})

const emits = defineEmits(['clickEvent'])

const triggerButton = (params) => {
	emits('clickEvent', params)

	let page = props.paggingData.page
	let first = configButton.firstButton
	let end = configButton.endButton
	if (page > end && page != pageOff.value) {
		configButton.firstButton += 1
		configButton.endButton += 1
	} else if (page < (first + 1) && page != 1) {
		configButton.firstButton -= 1
		configButton.endButton -= 1
	} else if (page === pageOff.value) {
		configButton.firstButton = pageOff.value - 3
		configButton.endButton = pageOff.value
	} else if (page === 1) {
		configButton.firstButton = 0
		configButton.endButton = 3
	}
}

const pageOff = computed(() => {
	return Math.ceil(props.paggingData.total / props.paggingData.limit)
})

const configButton = reactive({
	firstButton: 0,
	endButton: 3
})
const totalButton = computed(() => {

	let proc = pageOff.value
	let count = []
	for (let index = configButton.firstButton; index < proc && index < configButton.endButton; index++) {
		count.push(index + 1)
	}
	return count
})
</script>