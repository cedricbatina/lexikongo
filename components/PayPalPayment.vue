<template>
  <div>
    <div id="paypal-button-container"></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: "10.00", // Montant à payer
              },
            },
          ],
        });
      },
      onApprove: (data, actions) => {
        return actions.order.capture().then((details) => {
          alert("Transaction réussie : " + details.payer.name.given_name);
        });
      },
    })
    .render("#paypal-button-container");
});
</script>
