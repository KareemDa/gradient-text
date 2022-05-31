<template>
  <div class="flex h-screen w-screen bg-slate-100">
    <div class="w-1/3 bg-white h-full shadow-xl">
      <div class="py-10 px-5 md:px-10">
        <h1 class="text-4xl font-extrabold text-center mb-8">
          <span class="text-gradient css-gradient">CSS gradient Generator</span>
        </h1>
        <div class="mb-4">
          <div class="text-xl font-bold mb-2">Select Colors</div>
          <draggable
            v-model="colors"
            class="list-group"
            tag="transition-group"
            :component-data="{
              tag: 'ul',
              type: 'transition-group',
              name: 'flip-list'
            }"
            v-bind="dragOptions"
            item-key="id"
            handle=".handle"
          >
            <template #item="{ element }">
              <div class="flex items-center mb-6">
                <button
                  class="
                    h-14
                    w-14
                    rounded-lg
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    handle
                  "
                >
                  <hand-icon class="w-5 h-5 text-slate-400 mt-1"></hand-icon>
                </button>

                <button
                  class="
                    color-input
                    flex-grow
                    h-14
                    rounded-lg
                    shadow-xl
                    mx-6
                    text-white
                    font-bold
                  "
                  :style="`background-color: ${element};`"
                >
                  {{ element }}
                </button>

                <button
                  class="
                    h-14
                    w-14
                    rounded-lg
                    shadow-lg
                    flex
                    items-center
                    justify-center
                  "
                  :class="colors.length < 3 ? 'opacity-50' : ''"
                  :disabled="colors.length <= 2"
                  @click="colors.splice(index, 1)"
                >
                  <trash-icon
                    class="w-5 h-5 mt-1"
                    :class="
                      colors.length < 3 ? 'text-slate-400' : 'text-red-400'
                    "
                  ></trash-icon>
                </button>

                <client-only>
                  <color-picker
                    class="absolute top-4"
                    v-if="activeColor === index"
                    theme="light"
                    :color="colors[0]"
                    @changeColor="changeColor(index, $event.hex)"
                  ></color-picker>
                </client-only>
              </div>
            </template>
          </draggable>

          <button
            class="
              w-full
              h-14
              text-center
              rounded-lg
              bg-white
              shadow-lg
              flex
              justify-center
              items-center
              mb-6
            "
            @click="addRandomColor"
          >
            <plus-circle-icon class="h-8 w-8 text-blue-500"></plus-circle-icon>
          </button>
        </div>
      </div>
    </div>
    <div class="w-2/3 h-full flex items-center justify-center">
      <div class="bg-white px-10 py-20 rounded-2xl shadow-lg">
        <h1 class="text-6xl font-extrabold uppercase">
          <span
            class="text-gradient sample"
            :style="`background: ${textGradientValue}`"
          >
            Sample Text
          </span>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { PlusCircleIcon, TrashIcon, HandIcon } from "@heroicons/vue/outline";
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";

export default {
  data: () => ({
    colors: ["#42d392", "#647eff"],
    activeColor: -1,

    dragOptions: {
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "ghost",
    },
  }),

  components: { ColorPicker, draggable, PlusCircleIcon, TrashIcon, HandIcon },

  computed: {
    textGradientValue() {
      return `linear-gradient(315deg, ${this.colors.join(", ")})`;
    },
  },

  methods: {
    changeColor(index, hex) {
      this.colors[index] = hex;
      // this.activeColor = -1
    },

    addRandomColor() {
      // generate random hex
      const hex = "#" + Math.floor(Math.random() * 16777215).toString(16);
      this.colors.push(hex);
    },
  },
};
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

.sample {
  transition: all 0.3s ease-in-out; 
}

.button {
  margin-top: 35px;
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
</style>