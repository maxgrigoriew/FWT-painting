<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import IsHeader from '@/components/IsHeader.vue';
import IsPaintingList from '@/components/IsPaintingList.vue';
import { useStore } from '@/store/use-store';
import { storeToRefs } from 'pinia';
const store = useStore();
const { pages } = storeToRefs(store);
import debounce from './utils/debounce';

const sort = reactive({
  author: '',
  location: '',
  created: ''
});

const options = ref([
  { name: 'Квартира на вторичном рынке', procent: 10, value: 2 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 }
]);

const sortByAuthors = (value: string) => {
  sort.author = value;
};
const sortByLocation = (value: string) => {
  sort.location = value;
};
const sortByCreated = (value: string) => {
  sort.created = value;
};

watch(
  () => store.searchQuery,
  debounce(function (newVal: string) {
    store.searchQuery = newVal;
    store.fetchAll();
  }, 500)
);

watch(
  () => store.authorSelect.id,
  () => {
    store.fetchAll();
  }
);

const searchQuery = computed({
  get() {
    return store.searchQuery;
  },
  set(val) {
    store.searchQuery = val;
  }
});

onMounted(() => {
  store.fetchAll();
});
</script>

<template>
  <IsHeader />
  <div class="container">
    <div class="inputs">
      <is-input :value="searchQuery" v-model="searchQuery" placeholder="Name" />
      <is-select
        v-model="store.authorSelect.name"
        :options="store.mapAuthors"
        @option="store.setSelectAuthor"
        >Author</is-select
      >
      <is-select
        v-model="sort.location"
        :options="store.mapLocations"
        @option="store.setSelectAuthor"
        >Location</is-select
      >
      <is-select :options="options" @option="sortByCreated" />
    </div>

    <is-painting-list :paintings="store.concatArray" />
    <is-pagination
      style="margin-top: 40px"
      :pages="pages"
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

@media (min-width: 768px) {
  .inputs {
    flex-direction: row;
    gap: 20px;
  }
}
</style>
