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
  <label>
    <input
      :id="$style.formControl__input"
      :class="$style.formControl__input"
      type="text"
      placeholder="Введите текст"
      :value="props.modelValue"
      @input="
        emits('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </label>
</template>
<style module src="./IsInput.scss"></style>
