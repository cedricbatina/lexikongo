<template>
  <ul class="list-group">
    <li
      class="list-group-item"
      v-for="expression in expressions"
      :key="expression.id"
    >
      {{ expression.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  expressions: Array,
});
</script>
