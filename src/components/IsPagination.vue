<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, watch } from 'vue'
import { ref } from 'vue'
import { useStore } from './../store/use-store'

const store = useStore()

const props = defineProps(['pages', 'currentPage'])
const emits = defineEmits(['fetchData'])

watch(
  () => props.currentPage,
  () => {
    emits('fetchData')
  }
)
</script>

<template>
  <div class="pagination">
    <div
      class="pagination__item"
      :class="{ disabled: store.currentPage === 1 }"
      @click="store.setFirstPage"
    >
      <svg class="pagination__arrow" width="14" height="14">
        <use xlink:href="./../assets/images/sprite.svg#arrow-left"></use>
      </svg>
    </div>
    <div
      class="pagination__item"
      :class="{ disabled: store.currentPage === 1 }"
      @click="store.decrementPage"
    >
      <svg class="pagination__arrow" width="14" height="14">
        <use xlink:href="./../assets/images/sprite.svg#arrow-left-left"></use>
      </svg>
    </div>
    <div
      class="pagination__item"
      :class="{ active: pagination === store.currentPage }"
      v-for="(pagination, ind) in pages"
      :key="ind"
      @click="store.setPage(pagination)"
    >
      <div>{{ pagination }}</div>
    </div>

    <div
      class="pagination__item"
      :class="{ disabled: store.currentPage === store.pages }"
      @click="store.incrementPage"
    >
      <svg class="pagination__arrow" width="14" height="14">
        <use xlink:href="./../assets/images/sprite.svg#arrow-right"></use>
      </svg>
    </div>
    <div
      class="pagination__item"
      :class="{ disabled: store.currentPage === store.pages }"
      @click="store.setLastPage"
    >
      <svg class="pagination__arrow" width="14" height="14">
        <use xlink:href="./../assets/images/sprite.svg#arrow-right-right"></use>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  padding-top: 10px;
  display: flex;
  border-radius: var(--small-radius);
  &__item {
    border: 1px solid var(--default);
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: -1px;
    color: var(--default);
    cursor: pointer;
    font-size: 18px;
    font-weight: 500;

    &:first-child {
      border-top-left-radius: var(--small-radius);
      border-bottom-left-radius: var(--small-radius);
    }
    &:last-child {
      border-top-right-radius: var(--small-radius);
      border-bottom-right-radius: var(--small-radius);
    }
    &.active {
      background: var(--default);
      color: var(--light);
    }
    &.disabled {
      pointer-events: none;
      opacity: 0.3;
    }
  }

  &__arrow {
    fill: var(--default);
  }
}
</style>
