<template>
    <select class="form-select" v-bind="$attrs" @change="eventTriger"
      @input="$emit('update:modelValue', $event.target.value)" :value="modelValue">
      <option :value="null || ''" disabled>{{defaultVal ? defaultVal : '--Select Data--'}}</option>
      <option v-for="(obj, index) in options" :key="index" :value="obj[display.value]">{{ obj[display.label] }}</option>
    </select>
  </template>
  <script setup>
  const emits = defineEmits(['clickEvent', 'update:modelValue'])
  const props = defineProps({
    options: {
      type: Array
    },
    display: {
      type: Object,
      default: {
        value: 'id',
        label: 'name'
      }
    },
    defaultVal: {
      type: String,
      default: 'Select'
    },
    modelValue: [String, Number],
  })
  
  const eventTriger = () => {
    emits('clickEvent')
  }
  </script>