<script setup lang="ts"></script>

<template>
  <div class="loader">
    <div class="loader__inner">
      <img src="./../assets/images/loader.svg" alt="loader" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}
</style>
