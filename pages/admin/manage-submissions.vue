<template>
  <ManageSubmissions />
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  userRole: "admin",
});
</script>