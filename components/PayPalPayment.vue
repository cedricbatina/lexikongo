<template>
  <div class="paypal-container mt-4">
    <div id="paypal-button-container"></div>
    <div v-if="error" class="alert alert-danger mt-3" role="alert">
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRuntimeConfig } from "#app";

const config = useRuntimeConfig();
const paypalKey = config.public.paypalKey; // Récupération de la clé PayPal depuis l'environnement
const error = ref("");

onMounted(() => {
  if (!paypalKey) {
    error.value = "Clé PayPal introuvable. Veuillez vérifier la configuration.";
    return;
  }

  const script = document.createElement("script");
  script.src = `https://www.paypal.com/sdk/js?client-id=${paypalKey}&currency=EUR`;
  script.async = true;

  script.onload = () => {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: "10.00", // Remplacez par un montant dynamique si nécessaire
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then((details) => {
            alert(
              `Transaction réussie ! Merci, ${details.payer.name.given_name}.`
            );
          });
        },
        onError: (err) => {
          error.value = "Une erreur est survenue avec PayPal : " + err.message;
        },
      })
      .render("#paypal-button-container");
  };

  script.onerror = () => {
    error.value =
      "Impossible de charger le script PayPal. Veuillez réessayer plus tard.";
  };

  document.head.appendChild(script);
});
</script>

<style scoped>
.paypal-container {
  text-align: center;
}

.alert {
  font-size: 0.9rem;
}
</style>
