<script setup lang="ts">
// interface Props {
//   authorId: string
//   created: string
//   id: number
//   imageUrl: string
//   locationId: number
//   name: string
// }
const props = defineProps(['painting'])
</script>

<template>
  <div class="painting">
    <img
      class="painting__img"
      :src="`https://test-front.framework.team/${props.painting.imageUrl}`"
      :alt="props.painting.name"
    />
    <div class="painting__info">
      <h3 class="painting__title">{{ props.painting.name }}</h3>
      <div class="painting__bottom">
        <div class="painting__bottom-item">
          <span class="painting__bottom-title">Author:</span>
          <span class="painting__bottom-info">{{
            props.painting.authorName
          }}</span>
        </div>
        <div class="painting__bottom-item">
          <span class="painting__bottom-title">Created:</span>
          <span class="painting__bottom-info">{{
            props.painting.created
          }}</span>
        </div>
        <div class="painting__bottom-item">
          <span class="painting__bottom-title">Location:</span>
          <span class="painting__bottom-info">{{
            props.painting.localName
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.painting {
  position: relative;
  border-radius: var(--large-radius);
  overflow: hidden;

  &:hover {
    .painting__info {
      height: 52%;
      min-height: 110px;
    }

    .painting__bottom {
      opacity: 1;
    }
  }
  cursor: pointer;
  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    aspect-ratio: 28 / 20;
  }

  &__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 15px;
    border-bottom-left-radius: var(--large-radius);
    border-bottom-right-radius: var(--large-radius);
    background-color: var(--light-gray);
    height: 10%;
    min-height: 30px;
    transition: all var(--transition);
    color: var(--dark);
  }
  &__title {
    font-size: 18px;
    font-weight: 700;
    line-height: 24px;
    text-transform: capitalize;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 6px;
    opacity: 0;
    height: 0%;
    transition: all var(--transition);

    &-item {
      font-size: 13px;
      line-height: 20px;
    }

    &-title {
      font-weight: 500;
      margin-right: 10px;
    }
  }
}
</style>
