<script setup lang="ts">
interface Props {
  modelValue?: string;
}
const props = defineProps<Props>();
const emits = defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <input
    :class="$style.input"
    type="text"
    placeholder="Введите текст"
    :value="props.modelValue"
    @input="
      emits('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
<style module src="./IsInput.scss"></style>
