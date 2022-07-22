<template>
	<div class="bg-slate-100 py-3 px-4 rounded-xl">
		<input v-model="value" class="border-0 outline-0 w-full bg-transparent text-slate-500 font-bold" />
	</div>
</template>

<script lang="ts" setup>
	import { computed } from 'vue'

	const props = defineProps(['modelValue'])
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

<style></style>
