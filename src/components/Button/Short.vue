<template>
  <label>Show
    <select name="add-row_length" aria-controls="add-row" class="form-control form-control-sm"
      @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
      <option v-for="(opt, index) in option" :key="index" :value="opt.value">{{ opt.display }}</option>
    </select> entries</label>
</template>
<script setup>
const props = defineProps({
  modelValue: [String, Number],
  option: {
    type: [Object, String],
    default: [
      { value: 10, display: 10 },
      { value: 25, display: 25 },
      { value: 50, display: 50 },
      { value: 100, display: 100 },
    ]
  }
})

const emits = defineEmits(['update:modelValue'])
</script>