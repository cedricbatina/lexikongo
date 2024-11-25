<template>
  <div class="payment-form">
    <select v-model="selectedMethod" class="form-select mt-3">
      <option value="card">Carte Bancaire</option>
      <option value="paypal">PayPal</option>
      <option value="googlepay">Google Pay</option>
      <option value="banktransfer">Virement Bancaire</option>
    </select>

    <div class="mt-4">
      <component :is="currentComponent" @payment-success="handleSuccess" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Composants enfants
import CardPayment from "@/components/CardPayment.vue";
import PayPalPayment from "~/components/PayPalPayment.vue";
import GooglePayPayment from "@/components/GooglePayPayment.vue";
import BankTransfer from "@/components/BankTransfer.vue";

const selectedMethod = ref("card");

const currentComponent = computed(() => {
  switch (selectedMethod.value) {
    case "paypal":
      return PayPalPayment;
    case "googlepay":
      return GooglePayPayment;
    case "banktransfer":
      return BankTransfer;
    default:
      return CardPayment;
  }
});

const handleSuccess = () => {
  alert("Paiement réussi !");
};
</script>

<style scoped>
.payment-form {
  max-width: 600px;
  margin: 0 auto;
}
</style>
