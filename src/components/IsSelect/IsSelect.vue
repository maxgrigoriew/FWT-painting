<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { Author, Created, Location } from '@/types';

interface Props {
  from?: string;
  before?: string;
  modelValue?: string;
  options?: Author[] | Location[];
  isFilter?: boolean;
  filter?: Created;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  option: [value: Author | Location | string];
  'update:from': [value: string];
  'update:before': [value: string];
}>();
const selected = computed(() => (props.options && props.options?.length > 0 ? props.options[0].name : null));
const open = ref(false);
onMounted(() => {});
</script>
<template>
  <div
    v-click-outside="() => (open = false)"
    :class="[$style.customSelect, open === true ? $style.open : '']"
  >
    <div
      :class="[$style.selected, open === true ? $style.show : '']"
      @click="open = !open"
    >
      <div :class="$style.selected__title">
        {{ modelValue }}
        <slot v-if="!modelValue" />
      </div>
    </div>
    <svg
      v-if="open && modelValue"
      :class="$style.selected__close"
      width="8"
      height="8"
      @click="[(open = false), emits('option', '')]"
    >
      <use xlink:href="@/assets/images/sprite.svg#close" />
    </svg>
    <div :class="$style.items">
      <div
        v-if="!isFilter"
        :class="$style.items__select">
        <div
          v-for="option of options"
          :key="option.name"
          :class="$style.item"
          @click="
            [(selected = option.name), (open = false), emits('option', option)]
          "
        >
          <div :class="$style.item__title">{{ option.name }}</div>
        </div>
      </div>
      <div
        v-else
        :class="$style.items__filter">
        <is-input
          placeholder="from"
          :value="from"
          @input="emits('update:from', $event.target.value)"
        />
        <is-input
          placeholder="before"
          :value="before"
          @input="emits('update:before', $event.target.value)"
        />
      </div>
    </div>
  </div>
</template>
<style module src="./IsSelect.scss"></style>
