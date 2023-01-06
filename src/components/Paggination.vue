<template>
	<div v-if="pageOff > 1" class="row mt-2">
		<div class="col-sm-12 col-md-5">
			<div class="dataTables_info" id="add-row_info" role="status" aria-live="polite">Showing {{ paggingData.page }} to
				{{ pageOff }} of {{ paggingData.total }}
				entries</div>
		</div>
		<div class="col-sm-12 col-md-7">
			<div class="dataTables_paginate paging_simple_numbers" id="add-row_paginate">
				<ul class="pagination">
					<li :class="activated.front" class="paginate_button page-item previous" id="add-row_previous"><a
							@click.stop="triggerButton(1)" role="button" aria-controls="add-row" data-dt-idx="0" tabindex="0"
							class="page-link">First</a></li>
					<li :class="activated.prev" class="paginate_button page-item previous" id="add-row_previous"><a
							@click.stop="triggerButton(paggingData.page - 1)" role="button" aria-controls="add-row" data-dt-idx="0"
							tabindex="0" class="page-link">Previous</a></li>

					<li v-for="(button, index) in totalButton" :key="index" class="paginate_button page-item"
						:class="(paggingData.page === button ? 'active' : '')"><a @click="triggerButton(button)" role="button"
							aria-controls="add-row" data-dt-idx="1" tabindex="0" class="page-link">{{ button }}</a></li>

					<li :class="activated.next" class="paginate_button page-item next" id="add-row_next"><a
							@click.stop="triggerButton(paggingData.page + 1)" role="button" aria-controls="add-row" data-dt-idx="3"
							tabindex="0" class="page-link">Next</a></li>
					<li :class="activated.end" class="paginate_button page-item next" id="add-row_next"><a
							@click.stop="triggerButton(pageOff)" role="button" aria-controls="add-row" data-dt-idx="3" tabindex="0"
							class="page-link">End</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, reactive, onMounted, watch, ref } from 'vue'

const props = defineProps({
	paggingData: Object
})

const emits = defineEmits(['clickEvent'])

const activated = reactive({
	front: 'disabled',
	end: 'disabled',
	next: 'disabled',
	prev: 'disabled',
})

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

const visibleButton = () => {
	let page = props.paggingData.page
	let pageOf = pageOff.value

	if (page != 0 && page < pageOf && page === 1) {
		activated.next = ''
		activated.end = ''
		activated.prev = 'disabled'
		activated.front = 'disabled'
	} else if (page != 0 && page < pageOf && page > 1) {
		activated.next = ''
		activated.end = ''
		activated.prev = ''
		activated.front = ''
	} else if (page != 0 && page > 1 && page <= pageOf) {
		activated.next = 'disabled'
		activated.end = 'disabled'
		activated.prev = ''
		activated.front = ''
	}
}

const pageOff = computed(() => {
	return Math.ceil(props.paggingData.total / props.paggingData.limit)
})

watch(props.paggingData, (newProps) => {
	if (newProps.total || newProps.limit || newProps.page) {
		visibleButton()
	}
})

const configButton = reactive({
	firstButton: 0,
	endButton: 3
})

const totalButton = computed(() => {

	let proc = pageOff.value
	let count = []
	for (let index = configButton.firstButton; index < proc && index < configButton.endButton; index++) {
		if (index > -1) {
			count.push(index + 1)
		}
	}
	return count
})

onMounted(() => {
	visibleButton()
})
</script>