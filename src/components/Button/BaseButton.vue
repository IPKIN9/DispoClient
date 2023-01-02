<template>
	<button class="btn" v-bind="$attrs" @click="eventTrigger">
		<slot></slot>
	</button>
</template>
<script setup>
	const props = defineProps({
		buttonType: {
			type: String,
			default: 'button'
		},
		dataId: String,
		dataRows: Object
	})

	const emits = defineEmits(['eventClick'])

	const eventTrigger = () => {
		emits('eventClick', {dataId: props.dataId, dataRows: props.dataRows})
	}
</script>