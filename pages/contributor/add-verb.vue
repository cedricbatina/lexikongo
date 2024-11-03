<template>
  <ContributorAddVerbForm />
  <ContributorButtons />
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  requiredRole: "contributor",
});
</script>