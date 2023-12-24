<script setup lang="ts">
const props = defineProps(['painting']);
</script>

<template>
  <div :class="$style.painting">
    <img
      v-if="props.painting"
      :class="$style.painting__img"
      :src="`https://test-front.framework.team/${props.painting.imageUrl}`"
      :alt="props.painting.name"
    />
    <img
      v-else
      :class="$style.painting__img"
      src="./../assets/images/not-found.jpg"
      :alt="props.painting.imageUrl"
    />
    <div :class="$style.painting__info">
      <h3 :class="$style.painting__title">{{ props.painting.name }}</h3>
      <div :class="$style.painting__bottom">
        <div :class="$style.painting__bottomItem">
          <span :class="$style.painting__bottomTitle">Author:</span>
          <span :class="$style.painting__bottomInfo">{{
            props.painting.authorName
          }}</span>
        </div>
        <div :class="$style.painting__bottomItem">
          <span :class="$style.painting__bottomTitle">Created:</span>
          <span :class="$style.painting__bottomInfo">{{
            props.painting.created
          }}</span>
        </div>
        <div :class="$style.painting__bottomItem">
          <span :class="$style.painting__bottomTitle">Location:</span>
          <span :class="$style.painting__bottomInfo">{{
            props.painting.localName
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style module src="./IsPaintingListItem.scss"></style>
