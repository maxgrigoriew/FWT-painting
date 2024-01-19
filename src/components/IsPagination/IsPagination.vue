<script setup lang="ts">
import { watch, computed, useCssModule } from 'vue';
import useStore from '@/store/use-store';

interface Props {
  pages: number;
  currentPage: number;
}
const store = useStore();
const props = defineProps<Props>();
const $style = useCssModule();
const emits = defineEmits<{
  fetchData: [value: void];
}>();
watch(
  () => props.currentPage,
  () => {
    emits('fetchData');
  },
);

const disabled = computed(() =>
  store.currentPage === 1 ? $style.disabled : '',
);
</script>

<template>
  <div :class="$style.pagination">
    <div
      :class="[$style.pagination__item, disabled]"
      @click="store.setFirstPage"
    >
      <svg :class="$style.pagination__arrow" width="14" height="14">
        <use xlink:href="@/assets/images/sprite.svg#arrow-left" />
      </svg>
    </div>
    <div
      :class="[
        store.currentPage === 1 || !store.pages ? $style.disabled : '',
        $style.pagination__item,
      ]"
      @click="store.decrementPage"
    >
      <svg :class="$style.pagination__arrow" width="14" height="14">
        <use xlink:href="@/assets/images/sprite.svg#arrow-left-left" />
      </svg>
    </div>
    <div
      v-for="(pagination, ind) in pages"
      :key="ind"
      :class="[
        pagination === store.currentPage ? $style.active : '',
        $style.pagination__item,
      ]"
      @click="store.setPage(pagination)"
    >
      <div>{{ pagination }}</div>
    </div>

    <div
      :class="[
        store.currentPage === store.pages || !store.pages
          ? $style.disabled
          : '',
        $style.pagination__item,
      ]"
      @click="store.incrementPage"
    >
      <svg class="pagination__arrow" width="14" height="14">
        <use xlink:href="@/assets/images/sprite.svg#arrow-right" />
      </svg>
    </div>
    <div
      :class="[
        store.currentPage === store.pages || !store.pages
          ? $style.disabled
          : '',
        $style.pagination__item,
      ]"
      @click="store.setLastPage"
    >
      <svg :class="$style.pagination__arrow" width="14" height="14">
        <use xlink:href="@/assets/images/sprite.svg#arrow-right-right" />
      </svg>
    </div>
  </div>
</template>

<style module src="./IsPagination.scss"></style>
