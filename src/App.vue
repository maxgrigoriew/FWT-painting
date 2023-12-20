<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import IsHeader from './components/IsHeader.vue'
import IsPaintingItem from './components/IsPaintingItem.vue'
import axios from 'axios'
import { useStore } from './store/use-store'
import { storeToRefs } from 'pinia'
import PaintingServices from './servises/PaintingServices'
const store = useStore()
const { pages } = storeToRefs(store)
const inputValue = ref('')

const paintings = ref([])
const authors = ref([])
const locations = ref([])

const sort = reactive({
  author: null,
  location: null,
  created: null
})

const options = ref([
  { name: 'Квартира на вторичном рынке', procent: 10, value: 2 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 }
])

const sortByAuthors = (value) => {
  sort.author = value
}
const sortByLocation = (value) => {
  sort.location = value
}
const sortByCreated = (value) => {
  sort.created = value
}

onMounted(() => {
  store.getAll()
})
</script>

<template>
  <IsHeader />
  <div class="container">
    {{ store.painting }}
    <div class="inputs">
      <is-input v-model="inputValue" placeholder="Name" />
      <is-select :options="options" @option="sortByAuthors" />
      <is-select :options="store.locations" @option="sortByLocation" />
      <is-select :options="options" @option="sortByCreated" />
    </div>

    <div class="painting-list">
      <is-painting-item
        v-for="item in store.painting"
        :key="item.id"
        :painting="item"
      />
    </div>

    <is-pagination
      style="margin-top: 40px"
      :pages="pages"
      :currentPage="store.currentPage"
      @fetchData="store.fetchAllData"
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
