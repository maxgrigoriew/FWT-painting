<script setup lang="ts">
import IsPaintingItem from './IsPaintingItem.vue';

const props = defineProps(['paintings']);
</script>

<template>
  <div class="painting-wrapper">
    <div class="painting-list" v-if="props.paintings.length">
      <is-painting-item
        v-for="item in paintings"
        :key="item.id"
        :painting="item"
      />
    </div>
    <div class="painting-list" v-else>Список пуст</div>
  </div>
</template>
<style scoped lang="scss">
.painting-list {
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
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
