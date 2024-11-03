<template>
  <AddVerbForm />
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  requiredRole: "admin",
});
</script>