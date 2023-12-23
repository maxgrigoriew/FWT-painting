<script setup lang="ts">
import { useStore } from './../store/use-store';

const themeStore = useStore();
</script>

<template>
  <header>
    <div class="container">
      <div class="header__inner">
        <a href="#" class="header__logo">
          <svg class="pagination__arrow" width="68" height="68">
            <use xlink:href="./../assets/images/sprite.svg#logo"></use>
          </svg>
        </a>
        <button class="header__icon" @click="themeStore.changeTheme">
          <svg class="pagination__arrow1" width="22" height="22">
            <use xlink:href="./../assets/images/sprite.svg#theme"></use>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  &__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
  }

  &__logo {
    & svg path {
      stroke: var(--default);
    }
  }

  &__icon {
    display: inline-flex;
    padding: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all var(--transition);
    fill: var(--default);

    &:hover {
      transform: rotate(45deg);
    }

    & svg path {
      fill: var(--default);
    }
  }
}
</style>
../store/use-store
