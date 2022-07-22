<template>
	<input v-model="value" type="range" min="0" max="360" class="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer" />
</template>

<script lang="ts" setup>
	import { computed } from 'vue'

	const props = defineProps({
		modelValue: {
			type: Number,
			default: 135
		}
	})
	const emit = defineEmits(['update:modelValue'])

	const value = computed({
		get() {
			return props.modelValue
		},
		set(value) {
			emit('update:modelValue', value)
		}
	})
</script>
