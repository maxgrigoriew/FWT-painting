<script setup lang="ts">
import { useStore } from '@/store/use-store';

const store = useStore();
</script>

<template>
  <header>
    <div class="container">
      <div :class="$style.header__inner">
        <a href="#" :class="$style.header__logo">
          <svg :class="$style.pagination__arrow" width="68" height="68">
            <use xlink:href="@/assets/images/sprite.svg#logo"></use>
          </svg>
        </a>
        <button :class="$style.header__icon" @click="store.changeTheme">
          <svg :class="$style.pagination__arrow1" width="22" height="22">
            <use xlink:href="@/assets/images/sprite.svg#theme"></use>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style module src="./IsHeader.scss"></style>
