<template>
	<div class="flex h-screen w-screen bg-slate-100" style="flex-wrap: wrap">
		<div class="w-full md:w-1/2 lg:w-1/3 bg-white h-full shadow-xl overflow-y-auto">
			<div class="py-10 px-5 md:px-10">
				<h1 class="text-4xl font-extrabold text-center mb-8">
					<span class="text-gradient css-gradient">Gradient Text Generator</span>
				</h1>

				<div class="block md:hidden bg-slate-50 px-10 rounded-2xl overflow-hidden mb-8">
					<h1 class="text-3xl py-10 font-extrabold text-center uppercase">
						<span class="text-gradient sample" :style="`background: ${textGradientValue()}`"> {{ sampleText }} </span>
					</h1>

					<div class="-mx-10">
						<button class="py-3 flex bg-dark justify-center items-center w-full transition-all" :class="copied ? 'bg-primary text-white' : 'bg-dark-800 text-gray-400'" @click="copyText()">
							<clipboard-copy-icon class="h-6 w-6 mr-2"></clipboard-copy-icon>

							<span>{{ copyLabel }}</span>
						</button>
					</div>
				</div>

				<div class="mb-4">
					<div class="text-xl font-bold mb-2 text-slate-500">Text</div>
					<tailwind-input v-model="sampleText" class="mb-6"></tailwind-input>

					<div class="text-xl font-bold text-slate-500 -mb-2">Angle</div>
					<div class="flex items-center mb-6">
						<tailwind-range-slider v-model="angle" class="mr-4" />

						<div class="h-12 w-16 rounded-lg flex items-center justify-center font-bold bg-slate-100 text-slate-500 border-0 outline-0">
							{{ angle }}
						</div>
					</div>

					<div class="text-xl font-bold mb-2 text-slate-500">Colors</div>

					<draggable v-model="colors" v-bind="dragOptions" item-key="id" handle=".handle">
						<template #item="{ element, index }">
							<div class="flex items-center mb-6">
								<button class="h-14 w-14 rounded-lg shadow-lg flex items-center justify-center handle">
									<hand-icon class="w-5 h-5 text-slate-400 mt-1"></hand-icon>
								</button>

								<v-swatches class="flex-grow" v-model="colors[index]" show-fallback fallback-input-type="color" popover-x="left">
									<template #trigger>
										<button class="flex-grow color-input h-14 rounded-lg shadow-xl mx-6 text-white font-bold" :style="`background-color: ${element};`">
											{{ element.toUpperCase() }}
										</button>
									</template>
								</v-swatches>

								<button class="h-14 w-14 rounded-lg shadow-lg flex items-center justify-center" :class="colors.length < 3 ? 'opacity-50' : ''" :disabled="colors.length <= 2" @click="colors.splice(index, 1)">
									<trash-icon class="w-5 h-5 mt-1" :class="colors.length < 3 ? 'text-slate-400' : 'text-red-400'"> </trash-icon>
								</button>
							</div>
						</template>
					</draggable>

					<button class="w-full h-14 text-center rounded-lg bg-white shadow-md flex justify-center items-center mb-6" @click="addRandomColor">
						<plus-circle-icon class="h-8 w-8 text-blue-500"></plus-circle-icon>
						<span class="text-blue-500 font-bold ml-2 uppercase">new Color</span>
					</button>
				</div>
			</div>

			<copyright-footer class="block md:hidden" />
		</div>
		<div class="hidden md:block md:w-1/2 lg:w-2/3 py-16 relative">
			<div class="xl:w-2/3 flex justify-center flex-col h-full mx-auto px-6">
				<div class="bg-white px-10 py-20 rounded-2xl shadow-lg">
					<h1 class="text-4xl lg:text-6xl font-extrabold text-center uppercase">
						<span class="text-gradient sample" :style="`background: ${textGradientValue()}`"> {{ sampleText }} </span>
					</h1>
				</div>

				<div class="bg-dark overflow-hidden rounded-xl shadow-lg mt-8 px-10">
					<div class="py-10">
						<div class="text-gray-400 font-mono" v-html="textGradientCSS()"></div>
					</div>
					<div class="-mx-10">
						<button class="py-3 flex hover:bg-dark-900 justify-center items-center w-full transition-all" :class="copied ? 'bg-primary hover:bg-primary text-white' : 'bg-dark-800 text-gray-400'" @click="copyText()">
							<clipboard-copy-icon class="h-6 w-6 mr-2"></clipboard-copy-icon>

							<span>{{ copyLabel }}</span>
						</button>
					</div>
				</div>
			</div>

			<copyright-footer />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import draggable from 'vuedraggable'
	import VSwatches from 'vue3-swatches'
	import { PlusCircleIcon, TrashIcon, HandIcon, ClipboardCopyIcon } from '@heroicons/vue/outline/index.js'

	const colors = ref(['#42d392', '#647eff'])

	const angle = ref(135)

	const sampleText = ref('sample text')

	const dragOptions = ref({
		animation: 200,
		group: 'description',
		disabled: false,
		ghostClass: 'ghost'
	})

	const textGradientValue = () => {
		return `linear-gradient(${angle.value}deg, ${colors.value.join(', ')})`
	}

	const textGradientCSS = () => {
		return `
			<span style="color: #FFCC00">-webkit-background-clip</span>: text; <br />
			<span style="color: #FFCC00">-webkit-text-fill-color</span>: transparent; <br />
			<span style="color: #FFCC00">background</span>: 
				<span style='color: #82AAFF'>linear-gradient</span>(
					<span style="color: #F78C6C">${angle.value}deg</span>, ${colors.value.join(', ')}
				)
		`
	}

	const copied = ref(false)

	const copyLabel = computed(() => {
		return copied.value ? 'Copied to clipboard!' : 'Copy'
	})

	const copyText = () => {
		const text = '-webkit-background-clip: text;' + '\n' + '-webkit-text-fill-color: transparent;' + '\n' + `background: ${textGradientValue()}`

		navigator.clipboard.writeText(text)

		copied.value = true

		setTimeout(() => {
			copied.value = false
		}, 2000)
	}

	const addRandomColor = () => {
		const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`
		colors.value.push(randomColor)
	}
</script>

<style>
	.css-gradient {
		background: -webkit-linear-gradient(315deg, #42d392, #647eff);
	}

	.text-gradient {
		-webkit-text-fill-color: transparent !important;
		-webkit-background-clip: text !important;
		background-clip: text !important;
	}

	.vue-swatches__trigger__wrapper {
		display: flex !important;
	}

	.sample {
		transition: all 0.3s ease-in-out;
	}

	.flip-list-move {
		transition: transform 0.5s;
	}

	.no-move {
		transition: transform 0s;
	}

	.ghost {
		opacity: 0.5;
	}

	div::-webkit-scrollbar,
	main::-webkit-scrollbar,
	ol::-webkit-scrollbar,
	pre::-webkit-scrollbar,
	span::-webkit-scrollbar,
	ul::-webkit-scrollbar {
		width: 14px;
	}

	div::-webkit-scrollbar-thumb,
	main::-webkit-scrollbar-thumb,
	ol::-webkit-scrollbar-thumb,
	pre::-webkit-scrollbar-thumb,
	span::-webkit-scrollbar-thumb,
	ul::-webkit-scrollbar-thumb {
		background-color: #eff2f5;
		border: 4px solid rgba(0, 0, 0, 0);
		border-radius: 9999px;
		background-clip: padding-box;
	}
</style>
