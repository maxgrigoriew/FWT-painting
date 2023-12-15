<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import IsHeader from './components/IsHeader.vue'
import IsPaintingItem from './components/IsPaintingItem.vue'
import axios from 'axios'
import { useStore } from './store/use-store'

const store = useStore()

const inputValue = ref('')

const paintings = ref([])
const authors = ref([])
const locations = ref([])

const concatArray = computed(() => {
  const arrayWidthName = store.paintings.map((painting) => {
    const author = authors.value.find(
      (author) => painting.authorId === author.id
    )
    if (author) {
      return {
        ...painting,
        authorName: author.name
      }
    }
  })

  return arrayWidthName.map((painting) => {
    const location = locations.value.find(
      (local) => painting.locationId === local.id
    )
    if (location) {
      return {
        ...painting,
        localName: location.location
      }
    }
  })
})

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

const fetchAuthors = async () => {
  const { data } = await axios.get('https://test-front.framework.team/authors')
  authors.value = [...data]
}

const fetchLocations = async () => {
  const { data } = await axios.get(
    'https://test-front.framework.team/locations'
  )
  locations.value = [...data]
}

onMounted(() => {
  store.fetchPaintings()
  fetchAuthors()
  fetchLocations()
})
</script>

<template>
  <IsHeader />
  <div class="container">
    <div class="inputs">
      <is-input v-model="inputValue" placeholder="Name" />
      <is-select :options="options" @option="sortByAuthors" />
      <is-select :options="options" @option="sortByLocation" />
      <is-select :options="options" @option="sortByCreated" />
    </div>

    <div class="painting-list">
      <is-painting-item
        v-for="item in concatArray"
        :key="item.id"
        :painting="item"
      />
    </div>

    <is-pagination style="margin-top: 40px" />
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
