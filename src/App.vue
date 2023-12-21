<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue';
import IsHeader from '@/components/IsHeader.vue';
import IsPaintingItem from '@/components/IsPaintingItem.vue';
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
    {{ searchQuery }}
    <div class="inputs">
      <is-input :value="searchQuery" v-model="searchQuery" placeholder="Name" />
      <is-select :options="options" @option="sortByAuthors" />
      <is-select :options="store.locations" @option="sortByLocation" />
      <is-select :options="options" @option="sortByCreated" />
    </div>

    <div class="painting-list" v-if="!store.concatArray.length">
      <is-painting-item
        v-for="item in store.concatArray"
        :key="item.id"
        :painting="item"
      />
    </div>
    <div class="painting-list" v-else>Список пуст</div>
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

.painting-list {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .inputs {
    flex-direction: row;
    gap: 20px;
  }

  .painting-list {
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .painting-list {
    gap: 20px;
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
