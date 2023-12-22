<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
interface Props {
  modelValue: string;
  options: [];
}
const props = defineProps<Props>();
const emits = defineEmits<{
  option: [value: string];
}>();

const selected = computed(() =>
  props.options?.length > 0 ? props.options[0].name : null
);

const open = ref(false);

onMounted(() => {});
</script>
<template>
  <div
    class="custom-select"
    v-click-outside="() => (open = false)"
    :class="{ open }"
  >
    <div :class="`selected${open ? ' show' : ''}`" @click="open = !open">
      <div class="selected__title">
        {{ modelValue }}
        <slot v-if="!modelValue"></slot>
      </div>
    </div>
    <div class="items">
      <div
        class="item"
        v-for="(option, i) of options"
        :key="i"
        @click="
          [(selected = option.name), (open = false), emits('option', option)]
        "
      >
        <div class="item__title">{{ option.name }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.selected {
  min-height: 50px;
}
.custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;
  z-index: 2;
}
.custom-select .selected:after {
  position: absolute;
  content: '';
  right: 1em;
  width: 0;
  height: 0;
  transition: all var(--transition);
  transform: rotate(0) translateY(0);
  transform-origin: top;
  border: 5px solid var(--accent);
  border-color: var(--accent) transparent transparent transparent;
  z-index: 100;
}

.custom-select.open .selected:after {
  transform: rotate(180deg) translateY(-3px);
}
.selected {
  border-radius: var(--small-radius);
  border: 1px solid var(--accent);
  background: var(--light);
  padding-left: 15px;
  padding-right: 30px;
  cursor: pointer;
  user-select: none;
  transition: all var(--transition);

  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  &.show {
    & ~ .items {
      max-height: 250px;
      transition: all var(--transition);
      visibility: visible;
    }
  }
}
.custom-select.open .selected {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
.selected:after {
  position: absolute;
  content: '';
  top: 22px;
  right: 10px;
  width: 0;
  height: 0;
}
.items {
  border-radius: 0px 0px 6px 6px;
  overflow: hidden;
  border-right: 1px solid var(--accent);
  border-left: 1px solid var(--accent);
  border-bottom: 1px solid var(--accent);
  position: absolute;
  background-color: var(--light);
  left: 0;
  right: 0;
  z-index: 10;
  max-height: 0;
  overflow-y: scroll;
  transition: all var(--transition);
  visibility: hidden;
}
.item {
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  scrollbar-color: var(--accent);
  scrollbar-width: thin;
  color: var(--default);

  &__title {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:hover {
    background-color: var(--default);
    color: var(--light);
  }
}
</style>
