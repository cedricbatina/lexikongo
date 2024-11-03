<template>
  <AddWordForm />
</template>
<script setup>
definePageMeta({
  middleware: "auth", // Cela utilisera ton middleware auth.js pour la page
});
</script>