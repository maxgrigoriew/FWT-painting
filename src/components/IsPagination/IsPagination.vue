<script setup lang="ts">
import { watch } from 'vue';
import useStore from '@/store/use-store';

interface Props {
  pages: number;
  currentPage: number;
}
const store = useStore();

const props = defineProps<Props>();
const emits = defineEmits<{
  fetchData: [value: void];
}>();

watch(
  () => props.currentPage,
  () => {
    emits('fetchData');
  },
);
</script>

<template>
  <div :class="$style.pagination">
    <div
      :class="[
        store.currentPage === 1 ? $style.disabled : '',
        $style.pagination__item,
      ]"
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
      :class="[
        pagination === store.currentPage ? $style.active : '',
        $style.pagination__item,
      ]"
      v-for="(pagination, ind) in pages"
      :key="ind"
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
