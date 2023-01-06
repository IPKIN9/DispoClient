<template>
	<input :type="typeOf" class="form-control rounded" v-bind="$attrs"
		@input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
</template>
<script setup>
const emits = defineEmits(['update:modelValue'])
const props = defineProps({
	typeOf: {
		type: String,
		default: 'text'
	},
	modelValue: [String, Number],
})
</script>