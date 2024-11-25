<template>
  <form @submit.prevent="handlePayment" class="donation-form">
    <div class="form-group">
      <label for="amount" class="form-label">Montant (€)</label>
      <input
        id="amount"
        v-model="amount"
        type="number"
        min="1"
        class="form-control"
        placeholder="Entrez le montant"
        required
        aria-describedby="amount-help"
      />
      <small id="amount-help" class="form-text text-muted">
        Entrez un montant supérieur ou égal à 1€.
      </small>
    </div>

    <!-- Stripe Elements -->
    <div ref="cardElement" class="form-control mt-3" id="card-element"></div>
    <div v-if="error" class="text-danger mt-2">{{ error }}</div>

    <button type="submit" class="btn btn-primary mt-3" :disabled="isProcessing">
      {{ isProcessing ? "Traitement en cours..." : "Contribuer" }}
    </button>
  </form>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

const amount = ref("");
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const error = ref("");
const isProcessing = ref(false);

const handlePayment = async () => {
  try {
    if (!amount.value || parseFloat(amount.value) < 1) {
      error.value = "Veuillez entrer un montant valide.";
      return;
    }

    isProcessing.value = true;
    error.value = "";

    // Créer un PaymentIntent sur le backend
    const { clientSecret } = await $fetch("/api/create-payment-intent", {
      method: "POST",
      body: { amount: parseFloat(amount.value) },
    });

    // Confirmer le paiement
    const { error: stripeError } = await stripe.value.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement.value,
        },
      }
    );

    if (stripeError) {
      error.value = stripeError.message;
    } else {
      alert("Paiement réussi ! Merci pour votre contribution.");
    }
  } catch (err) {
    error.value = "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    isProcessing.value = false;
  }
};

onMounted(async () => {
  stripe.value = await loadStripe("pk_test_12345"); // Remplacez par votre clé publique Stripe
  elements.value = stripe.value.elements();
  cardElement.value = elements.value.create("card");
  cardElement.value.mount("#card-element");
});
</script>

<style scoped>
.donation-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
