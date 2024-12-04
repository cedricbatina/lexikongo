<template>
  <div class="payment-methods">
    <!-- Sélection des méthodes de paiement -->
    <div class="form-group mb-4">
      <label for="payment-method-select" class="form-label"
        >Choisissez une méthode de paiement :</label
      >
      <select
        id="payment-method-select"
        v-model="selectedMethod"
        class="form-select"
        @change="resetPaymentForms"
        aria-label="Sélectionnez une méthode de paiement"
      >
        <option value="">Sélectionnez une méthode</option>
        <option value="stripe">Carte Bancaire</option>
        <option value="paypal">PayPal</option>
        <option value="googlepay">Google Pay</option>
        <option value="virement">Virement Bancaire</option>
      </select>
    </div>

    <!-- Formulaire Stripe -->
    <div v-if="selectedMethod === 'stripe'" class="stripe-form mt-4">
      <h3 class="text-primary">
        <i class="fas fa-credit-card me-2"></i> Paiement par carte bancaire
      </h3>
      <form @submit.prevent="processStripePayment" aria-live="polite">
        <div class="form-group mb-3">
          <label for="stripe-amount">Montant (€)</label>
          <input
            id="stripe-amount"
            v-model="amount"
            type="number"
            min="1"
            class="form-control"
            placeholder="Entrez le montant"
            required
            aria-describedby="stripe-amount-help"
          />
          <small id="stripe-amount-help" class="form-text text-muted"
            >Montant minimum : 1€.</small
          >
        </div>
        <div
          ref="stripeCardElement"
          class="form-control mt-3"
          id="stripe-card-element"
        ></div>
        <div v-if="stripeError" class="text-danger mt-2">{{ stripeError }}</div>
        <button
          type="submit"
          class="btn btn-primary mt-3"
          :disabled="isProcessing"
        >
          <span v-if="isProcessing">Traitement en cours...</span>
          <span v-else>Payer avec Stripe</span>
        </button>
      </form>
    </div>

    <!-- Bouton PayPal -->
    <div v-if="selectedMethod === 'paypal'" class="paypal-form mt-4">
      <h3 class="text-primary">
        <i class="fab fa-paypal me-2"></i> Paiement via PayPal
      </h3>
      <PayPalPayment />
      <div id="paypal-button-container"></div>
    </div>

    <!-- Bouton Google Pay -->
    <div v-if="selectedMethod === 'googlepay'" class="googlepay-form mt-4">
      <h3 class="text-primary">
        <i class="fab fa-google-pay me-2"></i> Paiement avec Google Pay
      </h3>
      <div v-if="googlePayReady" id="googlepay-button-container"></div>
      <p v-else class="text-muted mt-3">
        Google Pay n'est pas encore configuré. Veuillez réessayer plus tard.
      </p>
    </div>

    <!-- Bouton Virement -->
    <div v-if="selectedMethod === 'virement'" class="bank-transfer mt-4">
      <h3 class="text-primary">
        <i class="fas fa-university me-2"></i> Virement Bancaire
      </h3>
      <BankTransfer />
    </div>

    <!-- Feedback global -->
    <div v-if="stripeError || !googlePayReady" class="alert alert-danger mt-3">
      {{
        stripeError || "Certaines méthodes de paiement ne sont pas disponibles."
      }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";

// Variables et références
const config = useRuntimeConfig();
const stripeKey = config.public.stripeKey; // Clé publique Stripe
const selectedMethod = ref("");
const amount = ref("");
const stripe = ref(null);
const stripeElements = ref(null);
const stripeCardElement = ref(null);
const stripeError = ref("");
const isProcessing = ref(false);
const googlePayReady = ref(false);

// Fonction de paiement Stripe
const processStripePayment = async () => {
  try {
    if (!amount.value || parseFloat(amount.value) < 1) {
      stripeError.value = "Veuillez entrer un montant valide.";
      return;
    }

    isProcessing.value = true;
    stripeError.value = "";

    const { clientSecret } = await $fetch("/api/create-payment-intent", {
      method: "POST",
      body: { amount: parseFloat(amount.value) },
    });

    const { error } = await stripe.value.confirmCardPayment(clientSecret, {
      payment_method: {
        card: stripeCardElement.value,
      },
    });

    if (error) {
      stripeError.value = error.message;
    } else {
      alert("Paiement réussi ! Merci pour votre contribution.");
    }
  } catch (error) {
    stripeError.value = "Une erreur est survenue. Veuillez réessayer.";
    console.error("Erreur Stripe :", error);
  } finally {
    isProcessing.value = false;
  }
};

// Réinitialiser les formulaires de paiement
const resetPaymentForms = () => {
  stripeError.value = "";
  if (selectedMethod.value === "stripe" && stripeCardElement.value) {
    stripeCardElement.value.mount("#stripe-card-element");
  }
};

// Initialisation Stripe
onMounted(async () => {
  try {
    if (!stripeKey) {
      throw new Error(
        "Clé publique Stripe manquante. Vérifiez votre configuration."
      );
    }

    stripe.value = await loadStripe(stripeKey);
    if (!stripe.value) {
      throw new Error("Erreur lors du chargement de Stripe.");
    }

    stripeElements.value = stripe.value.elements();
    stripeCardElement.value = stripeElements.value.create("card");
    stripeCardElement.value.mount("#stripe-card-element");

    console.log("Stripe initialisé avec succès.");
  } catch (err) {
    console.error("Erreur lors de l'initialisation de Stripe :", err);
    stripeError.value = "Erreur lors de l'initialisation de Stripe.";
  }
});
</script>



<style scoped>
.payment-methods {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.payment-methods h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.payment-methods .form-group {
  width: 100%;
  max-width: 400px;
}

.spinner {
  color: #007bff;
  font-size: 1rem;
}
</style>
