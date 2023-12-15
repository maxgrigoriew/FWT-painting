<script setup lang="ts">
interface Props {
  modelValue: string
}
const props = defineProps<Props>()
const emits = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <input
    class="input"
    type="text"
    placeholder="Введите текст"
    :value="props.modelValue"
    @input="emits('update:modelValue', $event.target.value)"
  />
</template>

<style lang="scss" scoped>
.input {
  display: block;
  width: 100%;
  padding: 15px 15px 14px;
  border-radius: var(--small-radius);
  border: 1px solid var(--gray);
  background: var(--light);
}
</style>
