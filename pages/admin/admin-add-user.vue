<template>
  <AddUserForm />
</template>
<script setup>
definePageMeta({
  middleware: "auth",
  requiredRole: "admin",
});
</script>