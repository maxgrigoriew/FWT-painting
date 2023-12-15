<script setup lang="ts">
import { ref } from 'vue'
import IsHeader from './components/IsHeader.vue'

const inputValue = ref('')

const defaultOption = {
  name: 'Квартира на вторичном рынке',
  procent: 10,
  value: 2
}

const selected = ref(null)
const options = ref([
  { name: 'Квартира на вторичном рынке', procent: 10, value: 2 },
  { name: 'Квартира в новостройке', procent: 9.9, value: 1 },
  { name: 'Купить дом', procent: 4.4, value: 3 },
  { name: 'Построить дом', procent: 5.3, value: 4 },
  { name: 'Купить землю или дачный дом', procent: 10.3, value: 5 },
  { name: 'Наличные подо залог жилья', procent: 10.9, value: 6 }
])

const selectChange = (value) => {
  selected.value = value
}
</script>

<template>
  <IsHeader />
  {{ selected }}
  <div class="container">
    <is-input v-model="inputValue" placeholder="Name" />
    <is-select :options="options" :selected="selected" @option="selectChange" />
  </div>
</template>

<style scoped></style>
