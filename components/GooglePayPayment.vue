<template>
  <div class="google-pay-container">
    <div id="google-pay-button"></div>
    <div v-if="error" class="alert alert-danger mt-3" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRuntimeConfig } from "#app";

const error = ref("");
const config = useRuntimeConfig();
const stripeKey = config.public.stripeKey; // Récupération de la clé publique Stripe

onMounted(() => {
  if (!stripeKey) {
    error.value = "Clé Stripe introuvable. Veuillez vérifier la configuration.";
    return;
  }

  const paymentsClient = new google.payments.api.PaymentsClient({
    environment: "TEST", // Remplacez par "PRODUCTION" en environnement de production
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
            "stripe:version": "2020-08-27",
            "stripe:publishableKey": stripeKey,
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890", // Remplacez par votre ID marchand Google
      merchantName: "Lexikongo",
    },
    transactionInfo: {
      totalPriceStatus: "FINAL",
      totalPrice: "10.00", // Remplacez par un montant dynamique si nécessaire
      currencyCode: "EUR",
    },
  };

  paymentsClient
    .isReadyToPay(paymentRequest)
    .then((response) => {
      if (response.result) {
        const button = paymentsClient.createButton({
          onClick: () => {
            paymentsClient
              .loadPaymentData(paymentRequest)
              .then((paymentData) => {
                console.log("Paiement réussi : ", paymentData);
                alert("Paiement réussi ! Merci pour votre contribution.");
              })
              .catch((err) => {
                error.value = "Une erreur est survenue lors du paiement.";
                console.error("Erreur de paiement : ", err);
              });
          },
        });
        document.getElementById("google-pay-button").appendChild(button);
      } else {
        error.value =
          "Google Pay n'est pas disponible pour cette méthode de paiement.";
      }
    })
    .catch((err) => {
      error.value = "Erreur lors de la vérification de Google Pay : " + err;
      console.error(err);
    });
});
</script>

<style scoped>
.google-pay-container {
  text-align: center;
}

.alert {
  font-size: 0.9rem;
}
</style>
