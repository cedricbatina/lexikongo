<template>
  <div class="payment-methods">
    <!-- Sélection des méthodes de paiement -->
    <div class="form-group mb-4">
      <label for="payment-method-select" class="form-label">
        Choisissez une méthode de paiement :
      </label>
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
    <div v-if="selectedMethod === 'stripe'" class="stripe-container">
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
          />
          <small id="stripe-amount-help" class="form-text text-muted">
            Montant minimum : 1€.
          </small>
        </div>
        <div id="stripe-card-element" class="stripe-element-container"></div>
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
      <p class="secure-payment mt-3">
        <i class="fas fa-lock secure-icon"></i>
        <span>Paiement 100% sécurisé via Stripe</span>
      </p>
    </div>

    <!--<div v-if="selectedMethod === 'stripe'" class="stripe-container">
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
          />
          <small id="stripe-amount-help" class="form-text text-muted">
            Montant minimum : 1€.
          </small>
        </div>
        <div
          ref="stripeCardElement"
          class="stripe-element-container form-control mt-3"
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
      <p class="secure-payment">
        <i class="fas fa-lock secure-icon"></i>
        Paiement 100% sécurisé avec Stripe
      </p>
    </div>-->

    <!-- Bouton PayPal -->
    <div v-if="selectedMethod === 'paypal'" class="paypal-form mt-4">
      <h3 class="text-primary">
        <i class="fab fa-paypal me-2"></i> Paiement via PayPal
      </h3>
      <div v-if="paypalReady" id="paypal-button-container"></div>
      <p v-else class="text-danger mt-3">
        PayPal n'est pas disponible pour le moment.
      </p>
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
import { ref, onMounted, watch, nextTick } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const stripeKey = config.public.stripeKey; // Clé publique Stripe
const selectedMethod = ref("stripe"); // Par défaut, "stripe" est sélectionné
const amount = ref("");
const stripe = ref(null);
const stripeElements = ref(null);
const stripeCardElement = ref(null);
const stripeError = ref("");
const isProcessing = ref(false);

// Fonction pour traiter le paiement
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

// Réinitialisation des formulaires
const resetPaymentForms = async () => {
  switch (selectedMethod.value) {
    case "stripe":
      await initializeStripe();
      break;
    case "paypal":
      await loadPayPalSdk(); // Charger le SDK PayPal
      break;
    case "googlepay":
      console.log("Google Pay ready to initialize"); // Exemple pour Google Pay
      break;
    default:
      console.warn("Méthode de paiement inconnue");
  }
};

// Initialisation Stripe
const initializeStripe = async () => {
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
    stripeCardElement.value = stripeElements.value.create("card", {
      style: {
        base: {
          color: "#32325d",
          fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
          fontSize: "16px",
          "::placeholder": {
            color: "#aab7c4",
          },
        },
      },
    });
    stripeCardElement.value.mount("#stripe-card-element");

    await nextTick();

    const stripeCardContainer = document.querySelector("#stripe-card-element");
    if (!stripeCardContainer) {
      throw new Error("Élément #stripe-card-element introuvable dans le DOM.");
    }

    stripeCardElement.value.mount("#stripe-card-element");
    console.log("Stripe Element 'card' monté avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'initialisation de Stripe :", error);
    stripeError.value = error.message || "Erreur lors de l'initialisation.";
  }
};

// Surveille les changements dans le mode de paiement
watch(selectedMethod, async (method) => {
  if (method === "stripe") {
    await initializeStripe();
  }
});

// Initialisation au chargement de la page
onMounted(async () => {
  if (selectedMethod.value === "stripe") {
    await initializeStripe();
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

.stripe-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.stripe-element-container {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
}

.secure-payment {
  margin-top: 10px;
  font-size: 0.9rem;
  color: #4caf50;
}

.secure-icon {
  margin-right: 5px;
  font-size: 1.2rem;
  color: #4caf50;
}
</style>
