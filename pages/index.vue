<template>
  <div class="flex h-screen w-screen bg-slate-100" style="flex-wrap: wrap">
    <div
      class="w-full md:w-1/2 lg:w-1/3 bg-white h-full shadow-xl overflow-y-auto"
    >
      <div class="py-10 px-5 md:px-10">
        <h1
          class="text-4xl font-black text-center text-gradient css-gradient mb-2"
        >
          Gradient Text Generator
        </h1>

        <div class="text-slate-500 text-center mb-8">
          Instantly create and embed stunning gradient texts using CSS or HTML.
          <br />
          Simple, efficient, and perfect for developers looking to enhance their
          projects.
        </div>

        <div
          class="block md:hidden bg-slate-50 px-10 rounded-2xl overflow-hidden mb-8"
        >
          <h2 class="text-3xl py-10 font-black text-center uppercase">
            <span
              class="text-gradient sample"
              :style="`background: ${textGradientValue}`"
            >
              {{ sampleText }}
            </span>
          </h2>

          <div class="grid grid-cols-2 -mx-10">
            <button
              aria-label="Copy CSS"
              class="py-3 flex bg-dark text-gray-400 justify-center items-center w-full transition-all"
              @click="copyCSS()"
            >
              <span>Copy CSS</span>
            </button>

            <button
              aria-label="Copy HTML"
              class="py-3 flex bg-dark text-gray-400 justify-center items-center w-full transition-all"
              @click="copyElement()"
            >
              <span>Copy HTML</span>
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
              :style="`background: ${textGradientValue}`"
            >
              {{ sampleText }}
            </span>
          </h2>
        </div>

        <div class="bg-dark overflow-hidden rounded-xl shadow-lg mt-8 px-10">
          <div
            class="text-gray-400 font-mono flex flex-col py-10"
            v-html="textGradientCSS"
          ></div>

          <div class="grid grid-cols-2 -mx-10">
            <button
              aria-label="Copy CSS Code"
              class="py-3 flex bg-dark-800 text-gray-400 hover:bg-dark-900 justify-center items-center w-full transition-all"
              @click="copyCSS()"
            >
              <clipboard-icon class="h-6 w-6 mr-2"></clipboard-icon>

              <span>Copy CSS</span>
            </button>

            <button
              aria-label="Copy HTML & CSS"
              class="py-3 flex bg-dark-800 text-gray-400 hover:bg-dark-900 justify-center border-l border-l-dark-900 items-center w-full transition-all"
              @click="copyElement()"
            >
              <clipboard-icon class="h-6 w-6 mr-2"></clipboard-icon>

              <span>Copy HTML</span>
            </button>
          </div>
        </div>
      </div>

      <copyright-footer />
    </div>

    <transition name="fade">
      <div v-if="copied" class="absolute bottom-16 right-4">
        <div class="bg-primary text-white font-bold rounded-lg py-2 px-12">
          Copied To Clipboard!
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import draggable from "vuedraggable";
import { useGtag } from "vue-gtag-next";

import {
  PlusCircleIcon,
  TrashIcon,
  HandRaisedIcon,
  ClipboardIcon,
} from "@heroicons/vue/24/outline";

const { event } = useGtag();

const colors = ref(["#42d392", "#647eff"]);
const angle = ref(135);
const sampleText = ref("sample text");

const dragOptions = ref({
  animation: 200,
  group: "description",
  disabled: false,
  ghostClass: "ghost",
});

const textGradientValue = computed(() => {
  return `linear-gradient(${angle.value}deg, ${colors.value.join(", ")})`;
});

const textGradientCSS = computed(() => {
  return `
      <span>

			<span style="color: #FFCC00">background</span>:
				<span style='color: #82AAFF'>linear-gradient</span>
        (<span style="color: #F78C6C">${
          angle.value
        }deg</span>, ${colors.value.join(", ")})
      </span>
      <span>
        <span style="color: #FFCC00">-webkit-background-clip</span>: text; <br />
      </span>
      <span>
        <span style="color: #FFCC00">-webkit-text-fill-color</span>: transparent; <br />
      </span>
		`;
});

const copied = ref(false);

const copyCSS = () => {
  const text =
    "-webkit-background-clip: text;" +
    "\n" +
    "-webkit-text-fill-color: transparent;" +
    "\n" +
    `background: ${textGradientValue.value}`;

  navigator.clipboard.writeText(text);

  copied.value = true;

  event("click:copy_css");

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const copyElement = () => {
  const gradientCSS = `-webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background: ${textGradientValue.value};`;

  // HTML element example - replace 'Your Text Here' with your specific element content
  const htmlElement = `<span style="${gradientCSS}">Your Text Here</span>`;

  navigator.clipboard.writeText(htmlElement);

  copied.value = true;

  event("click:copy_html");

  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

const addRandomColor = () => {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  colors.value.push(randomColor);

  event("click:add_color");
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
    name: "How can I copy the gradient as CSS or HTML?",
    answer:
      "After customizing your gradient, you have two options: Click the 'Copy CSS' button to copy the CSS code, or use the 'Copy HTML' button to get the HTML with inline styles. Both options place the code on your clipboard, ready for use in your project.",
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

/* we will explain what these classes do next! */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
