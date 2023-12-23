<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useStore } from '@/store/use-store';
import { storeToRefs } from 'pinia';
const store = useStore();

interface Created {
  from: null | string;
  before: null | string;
}

interface Props {
  modelValue: string;
  options: [];
  isFilter: boolean;
  filter: Created;
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
    <svg
      v-if="open && modelValue"
      @click="[(open = false), emits('option', '')]"
      class="selected__close"
      width="8"
      height="8"
    >
      <use xlink:href="./../assets/images/sprite.svg#close"></use>
    </svg>
    <div class="items">
      <div class="items__select" v-if="!isFilter">
        <div
          class="item"
          v-for="option of options"
          :key="option.id"
          @click="
            [(selected = option.name), (open = false), emits('option', option)]
          "
        >
          <div class="item__title">{{ option.name }}</div>
        </div>
      </div>
      <div v-else class="items__filter">
        <is-input placeholder="from" v-model="store.createdSelect.from" />
        <is-input placeholder="before" v-model="store.createdSelect.before" />
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
  background: transparent;
  padding-left: 15px;
  padding-right: 44px;
  cursor: pointer;
  user-select: none;

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

  &__close {
    position: absolute;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
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

  &__filter {
    position: relative;
    display: flex;
    gap: 32px;
    padding: 20px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 0.5px;
      background-color: var(--default);
      transform: translate(-50%, -50%);
    }
  }
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
