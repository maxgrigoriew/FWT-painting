<script setup lang="ts">
import { onMounted, watch } from 'vue';
import IsHeader from '@/components/IsHeader/IsHeader.vue';
import IsPaintingList from '@/components/IsPaintingList/IsPaintingList.vue';
import useStore from './store/use-store';
import { debounce } from './utils/debounce';

const store = useStore();
watch(
  () => store.searchQuery,
  debounce((newVal: string) => {
    store.setSearchQuery(newVal);
    store.fetchAll();
  }, 500),
);
watch(
  store.createdSelect,
  debounce((newVal: { from: string; before: string }) => {
    store.createdSelect.from = newVal.from;
    store.createdSelect.before = newVal.before;
    store.fetchAll();
  }, 500),
);
watch(
  () => [store.authorSelect?.id, store.locationSelect?.id],
  () => {
    store.fetchAll();
  },
);
onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <IsHeader />

  <div class="container">
    <div class="inputs">
      <is-input
        v-model="store.searchQuery"
        placeholder="Name" />
      <is-select
        :options="store.mapAuthors"
        v-model="store.authorSelect.name"
        class="author-select"
        @option="store.setSelectAuthor"
      >Author</is-select
      >
      <is-select
        v-model="store.locationSelect.name"
        class="location-select"
        :options="store.mapLocations"
        @option="store.setSelectLocation"
      >Location</is-select
      >
      <is-select
        v-model:from="store.createdSelect.from"
        v-model:before="store.createdSelect.before"
        :is-filter="true"
      >Created</is-select
      >
    </div>

    <is-painting-list :paintings="store.concatArray" />
    <is-pagination
      style="margin-top: 40px"
      :pages="store.pages"
      :currentPage="store.currentPage"
      @fetchData="store.fetchAll"
    />
    <is-loader v-if="store.isLoading" />
  </div>
</template>

<style scoped lang="scss">
.inputs {
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 45px;
}

.author-select {
  z-index: 4;
}

.location-select {
  z-index: 3;
}

@media (min-width: 768px) {
  .inputs {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
