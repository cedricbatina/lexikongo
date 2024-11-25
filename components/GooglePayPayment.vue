<template>
  <div id="google-pay-button"></div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
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
            "stripe:version": "2020-08-27",
            "stripe:publishableKey": "pk_test_12345", // Clé publique Stripe
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: "12345678901234567890",
      merchantName: "Lexikongo",
    },
  };

  paymentsClient
    .isReadyToPay(paymentRequest)
    .then((response) => {
      if (response.result) {
        const button = paymentsClient.createButton({
          onClick: () => {
            paymentsClient.loadPaymentData(paymentRequest);
          },
        });
        document.getElementById("google-pay-button").appendChild(button);
      }
    })
    .catch((err) => console.error(err));
});
</script>

