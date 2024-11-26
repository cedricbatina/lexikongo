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
          <small id="stripe-amount-help" class="form-text text-muted">
            Montant minimum : 1€.
          </small>
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
      <div id="paypal-button-container"></div>
      <div v-if="isProcessing" class="spinner mt-2">Chargement...</div>
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const stripeKey = config.public.stripeKey; // Récupération de la clé publique Stripe
const selectedMethod = ref("");
const amount = ref("");
const stripe = ref(null);
const stripeElements = ref(null);
const stripeCardElement = ref(null);
const stripeError = ref("");
const isProcessing = ref(false);
const googlePayReady = ref(false);

// Processus de paiement avec Stripe
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

// Rendu des boutons PayPal et Google Pay
const resetPaymentForms = () => {
  if (selectedMethod.value === "paypal") renderPayPalButton();
  else if (selectedMethod.value === "googlepay") renderGooglePayButton();
};

// Rendu du bouton PayPal
const renderPayPalButton = () => {
  if (window.paypal) {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: { value: amount.value || "1.00" },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Paiement réussi : Merci, ${details.payer.name.given_name}`);
          });
        },
        onError: (err) => {
          alert("Erreur PayPal : " + err.message);
        },
      })
      .render("#paypal-button-container");
  }
};

// Rendu du bouton Google Pay
const renderGooglePayButton = () => {
  if (!stripeKey) return;

  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: "TEST",
  });
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: "CARD",
        parameters: {
          allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
          allowedCardNetworks: ["MASTERCARD", "VISA"],
        },
        tokenizationSpecification: {
          type: "PAYMENT_GATEWAY",
          parameters: {
            gateway: "stripe",
            "stripe:publishableKey": stripeKey,
            "stripe:version": "2020-08-27",
          },
        },
      },
    ],
    merchantInfo: { merchantName: "Lexikongo" },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: amount.value || "1.00",
      currencyCode: "EUR",
    },
  };

  paymentsClient
    .isReadyToPay(paymentRequest)
    .then((response) => {
      if (response.result) {
        googlePayReady.value = true;
        const button = paymentsClient.createButton({
          onClick: () => paymentsClient.loadPaymentData(paymentRequest),
        });
        document
          .getElementById("googlepay-button-container")
          .appendChild(button);
      } else {
        googlePayReady.value = false;
      }
    })
    .catch((err) => {
      console.error("Erreur Google Pay :", err);
      googlePayReady.value = false;
    });
};

// Initialisation Stripe
onMounted(async () => {
  try {
    if (!stripePublicKey) {
      throw new Error("Clé publique Stripe manquante.");
    }

    stripe.value = await loadStripe(stripePublicKey);
    elements.value = stripe.value.elements();
    cardElement.value = elements.value.create("card");
    cardElement.value.mount("#card-element");
    stripeInitialized.value = true;
  } catch (err) {
    console.error("Erreur lors de l'initialisation de Stripe:", err);
    err.value = "Impossible de charger les options de paiement.";
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
