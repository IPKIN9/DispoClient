<template>
	<router-link :to="linkTo" v-bind="$attrs">
		<slot></slot>
	</router-link>
</template>
<script setup>
  const props = defineProps({
		linkTo: Object
	})
</script>