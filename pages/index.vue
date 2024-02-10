<template>
  <div class="flex h-screen w-screen bg-slate-100" style="flex-wrap: wrap">
    <div
      class="w-full md:w-1/2 lg:w-1/3 bg-white h-full shadow-xl overflow-y-auto"
    >
      <div class="py-10 px-5 md:px-10">
        <h1 class="text-4xl font-black text-center mb-8">
          <span class="text-gradient css-gradient">
            Gradient Text Generator
          </span>
        </h1>

        <div
          class="block md:hidden bg-slate-50 px-10 rounded-2xl overflow-hidden mb-8"
        >
          <h2 class="text-3xl py-10 font-black text-center uppercase">
            <span
              class="text-gradient sample"
              :style="`background: ${textGradientValue()}`"
            >
              {{ sampleText }}
            </span>
          </h2>

          <div class="-mx-10">
            <button
              aria-label="Copy"
              class="py-3 flex bg-dark justify-center items-center w-full transition-all"
              :class="
                copied ? 'bg-primary text-white' : 'bg-dark-800 text-gray-400'
              "
              @click="copyText()"
            >
              <clipboard-icon class="h-6 w-6 mr-2"></clipboard-icon>

              <span>{{ copyLabel }}</span>
            </button>
          </div>
        </div>

        <div class="mb-4">
          <label class="text-xl font-bold text-slate-500">
            <div class="mb-2">Text</div>

            <tailwind-input v-model="sampleText" class="mb-6"></tailwind-input>
          </label>

          <label class="text-xl font-bold text-slate-500">
            <div class="-mb-2">Angle</div>

            <div class="flex items-center mb-6">
              <tailwind-range-slider v-model="angle" class="mr-4" />

              <div
                class="h-12 w-16 rounded-lg flex items-center justify-center font-bold bg-slate-100 text-slate-500 border-0 outline-0"
              >
                {{ angle }}
              </div>
            </div>
          </label>

          <div class="text-xl font-bold mb-2 text-slate-500">Colors</div>

          <draggable
            v-model="colors"
            v-bind="dragOptions"
            item-key="id"
            handle=".handle"
          >
            <template #item="{ element, index }">
              <div class="flex items-center mb-6">
                <button
                  aria-label="Drag"
                  class="h-14 w-14 rounded-lg shadow-lg flex items-center justify-center handle"
                >
                  <hand-raised-icon
                    class="w-5 h-5 text-slate-400 mt-1"
                  ></hand-raised-icon>
                </button>

                <client-only>
                  <v-swatches
                    class="flex-grow"
                    v-model="colors[index]"
                    show-fallback
                    fallback-input-type="color"
                    popover-x="left"
                  >
                    <template #trigger>
                      <button
                        class="flex-grow color-input h-14 rounded-lg shadow-xl mx-6 text-white font-bold"
                        :style="`background-color: ${element};`"
                      >
                        {{ element.toUpperCase() }}
                      </button>
                    </template>
                  </v-swatches>
                </client-only>

                <button
                  aria-label="Delete"
                  class="h-14 w-14 rounded-lg shadow-lg flex items-center justify-center"
                  :class="colors.length < 3 ? 'opacity-50' : ''"
                  :disabled="colors.length <= 2"
                  @click="colors.splice(index, 1)"
                >
                  <trash-icon
                    class="w-5 h-5 mt-1"
                    :class="
                      colors.length < 3 ? 'text-slate-400' : 'text-red-400'
                    "
                  >
                  </trash-icon>
                </button>
              </div>
            </template>
          </draggable>

          <button
            aria-label="Add color"
            class="w-full h-14 text-center rounded-lg bg-white shadow-md flex justify-center items-center mb-6"
            @click="addRandomColor"
          >
            <plus-circle-icon class="h-8 w-8 text-blue-500"></plus-circle-icon>
            <span class="text-blue-500 font-bold ml-2 uppercase"
              >new Color</span
            >
          </button>
        </div>
      </div>

      <copyright-footer class="block md:hidden" />
    </div>

    <div class="hidden md:block md:w-1/2 lg:w-2/3 py-16 relative">
      <div class="xl:w-2/3 flex justify-center flex-col h-full mx-auto px-6">
        <div class="bg-white px-10 py-20 rounded-2xl shadow-lg">
          <h2 class="text-4xl lg:text-6xl font-black text-center uppercase">
            <span
              class="text-gradient sample"
              :style="`background: ${textGradientValue()}`"
            >
              {{ sampleText }}
            </span>
          </h2>
        </div>

        <div class="bg-dark overflow-hidden rounded-xl shadow-lg mt-8 px-10">
          <div class="py-10">
            <div
              class="text-gray-400 font-mono"
              v-html="textGradientCSS()"
            ></div>
          </div>
          <div class="-mx-10">
            <button
              aria-label="Copy Code"
              class="py-3 flex hover:bg-dark-900 justify-center items-center w-full transition-all"
              :class="
                copied
                  ? 'bg-primary hover:bg-primary text-white'
                  : 'bg-dark-800 text-gray-400'
              "
              @click="copyText()"
            >
              <clipboard-icon class="h-6 w-6 mr-2"></clipboard-icon>

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
import draggable from "vuedraggable";

import {
  PlusCircleIcon,
  TrashIcon,
  HandRaisedIcon,
  ClipboardIcon,
} from "@heroicons/vue/24/outline";

const colors = ref(["#42d392", "#647eff"]);

const angle = ref(135);

const sampleText = ref("sample text");

const dragOptions = ref({
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
});

const textGradientValue = () => {
  return `linear-gradient(${angle.value}deg, ${colors.value.join(", ")})`;
};

const textGradientCSS = () => {
  return `
			<span style="color: #FFCC00">background</span>:
				<span style='color: #82AAFF'>linear-gradient</span>(
					<span style="color: #F78C6C">${angle.value}deg</span>, ${colors.value.join(
    ", "
  )}
				)
			<span style="color: #FFCC00">-webkit-background-clip</span>: text; <br />
			<span style="color: #FFCC00">-webkit-text-fill-color</span>: transparent; <br />
		`;
};

const copied = ref(false);

const copyLabel = computed(() => {
  return copied.value ? "Copied to clipboard!" : "Copy";
});

const copyText = () => {
  const text =
    "-webkit-background-clip: text;" +
    "\n" +
    "-webkit-text-fill-color: transparent;" +
    "\n" +
    `background: ${textGradientValue()}`;

  navigator.clipboard.writeText(text);

  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const addRandomColor = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  colors.value.push(randomColor);
};

useSchemaOrg([
  defineSoftwareApp({
    name: "CSS gradient text | free online gradient text generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    offers: {
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      ratingValue: "4.8",
      reviewCount: "1500",
    },
  }),

  defineHowTo({
    name: "How to Generate CSS Gradient Text",
    description:
      "Follow these steps to create beautiful CSS gradient text for your web designs.",
    estimatedCost: "Free",
    tool: "CSS Gradient Text Generator tool",
    totalTime: "PT1M",

    step: [
      {
        text: "Click the 'Add More' button to create a new color for your gradient.",
      },
      {
        text: "Click on the color to change it. You can choose from predefined colors or add your custom one.",
      },
      {
        text: "Rearrange the colors by dragging the icon on the left of each color.",
      },
      {
        text: "Delete any color by clicking on the delete icon on the right of the color.",
      },
      {
        text: "The result on the text is automatically updated to reflect your gradient choices.",
      },
      {
        text: "Finally, copy the CSS code generated for your gradient by clicking the 'Copy CSS' button.",
      },
    ],
  }),

  defineQuestion({
    name: "How do I add a new color to my gradient?",
    answer:
      "Click the 'Add More' button to introduce a new color to your gradient. You can then customize this color as needed.",
  }),

  defineQuestion({
    name: "Can I rearrange the colors in my gradient?",
    answer:
      "Yes, colors can be rearranged by dragging the icon on the left of each color entry, allowing you to customize the order of colors in your gradient.",
  }),

  defineQuestion({
    name: "How do I delete a color from my gradient?",
    answer:
      "To remove a color, click on the delete icon located on the right side of the color. This action will delete the color from your gradient configuration.",
  }),

  defineQuestion({
    name: "How can I copy the CSS code for the gradient?",
    answer:
      "Once you're satisfied with your gradient, click the 'Copy CSS' button to copy the generated CSS code to your clipboard, ready to be pasted into your project.",
  }),
]);
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
