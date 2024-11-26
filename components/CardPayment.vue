<template>
  <form @submit.prevent="handlePayment" class="donation-form">
    <!-- Montant -->
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
    <div
      v-if="stripeInitialized"
      ref="cardElement"
      class="form-control mt-3"
      id="card-element"
    ></div>
    <div v-else class="alert alert-warning mt-3" role="alert">
      Chargement des options de paiement en cours...
    </div>
    <div
      v-if="error"
      class="text-danger mt-2"
      aria-live="polite"
      id="card-errors"
    >
      {{ error }}
    </div>

    <!-- Bouton de contribution -->
    <button
      type="submit"
      class="btn btn-primary mt-3 w-100"
      :disabled="isProcessing || !stripeInitialized"
      aria-busy="true"
    >
      <span
        v-if="isProcessing"
        class="spinner-border spinner-border-sm me-2"
      ></span>
      {{ isProcessing ? "Traitement en cours..." : "Contribuer" }}
    </button>
  </form>
</template>

---

### **Script corrigé**

```javascript
<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app"; // Importation de la configuration

const config = useRuntimeConfig();
const stripePublicKey = config.public.stripePublicKey; // Récupération de la clé publique

if (!stripePublicKey) {
  console.error("Clé publique Stripe manquante.");
} else {
  console.log("Clé publique Stripe :", stripePublicKey);
}
const amount = ref("");
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);
const error = ref("");
const isProcessing = ref(false);
const stripeInitialized = ref(false);

const handlePayment = async () => {
  if (!stripeInitialized.value) {
    error.value = "Le paiement n'est pas prêt. Veuillez réessayer.";
    return;
  }

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
      amount.value = ""; // Réinitialisation du montant après succès
    }
  } catch (err) {
    error.value = "Une erreur est survenue. Veuillez réessayer.";
    console.error("Erreur lors du paiement :", err);
  } finally {
    isProcessing.value = false;
  }
};

onMounted(async () => {
  try {
    if (!stripePublicKey) {
      throw new Error("Clé publique Stripe manquante.");
    }

    stripe.value = await loadStripe(stripePublicKey); // Utilisation de la clé publique
    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create("card");
    cardElement.value.mount("#card-element");
    stripeInitialized.value = true;
  } catch (err) {
    console.error("Erreur lors de l'initialisation de Stripe:", err);
    error.value = "Impossible de charger les options de paiement.";
  }
});
</script>
<style scoped>
.donation-form {
  max-width: 400px;
  margin: 0 auto;
}

.spinner-border {
  vertical-align: middle;
}

.text-danger {
  font-size: 0.875rem;
}

.alert {
  font-size: 0.9rem;
  text-align: center;
}
</style>
