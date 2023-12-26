<script setup lang="ts">
import type { Painting } from '@/types';
import IsPaintingListItem from '../IsPaintingListItem/IsPaintingListItem.vue';

interface Props {
  paintings: Painting[];
}
const props = defineProps<Props>();
</script>

<template>
  <div :class="$style.paintingWrapper">
    <div :class="$style.paintingList" v-if="props.paintings.length">
      <is-painting-list-item
        v-for="item in paintings"
        :key="item.id"
        :painting="item"
      />
    </div>
    <div :class="$style.paintingList" v-else>Список пуст</div>
  </div>
</template>
<style module src="./IsPaintingList.scss"></style>
