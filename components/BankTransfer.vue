<template>
  <div class="bank-transfer mt-4">
    <p class="info-text">
      Effectuez un virement bancaire en utilisant les coordonnées ci-dessous.
      N'oubliez pas d'inclure votre référence pour un traitement rapide.
    </p>
    <ul class="list-group mt-3">
      <li class="list-group-item">
        <strong>Bénéficiaire :</strong> MONSIEUR CEDRIC BATINA
      </li>
      <li class="list-group-item">
        <strong>IBAN :</strong>
        <span class="iban">FR76 1741 8000 0100 0083 0001 392</span>
        <button
          class="btn btn-sm btn-outline-primary ms-3 copy-button"
          @click="copyToClipboard('FR76 1741 8000 0100 0083 0001 392')"
          aria-label="Copier l'IBAN"
        >
          Copier
        </button>
      </li>
      <li class="list-group-item">
        <strong>BIC :</strong>
        <span class="bic">SNNNFR22XXX</span>
        <button
          class="btn btn-sm btn-outline-primary ms-3 copy-button"
          @click="copyToClipboard('SNNNFR22XXX')"
          aria-label="Copier le BIC"
        >
          Copier
        </button>
      </li>
      <li class="list-group-item">
        <strong>Référence :</strong> Votre email ou identifiant utilisateur
      </li>
    </ul>
    <p class="mt-3">
      Une fois votre virement effectué, merci de nous envoyer un email à
      <a href="mailto:info@lexikongo.fr" class="text-primary"
        >info@lexikongo.fr</a
      >
      avec les détails de votre paiement.
    </p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Texte copié : " + text);
    })
    .catch((err) => {
      console.error("Erreur lors de la copie dans le presse-papiers :", err);
    });
};
</script>

<style scoped>
.bank-transfer {
  font-size: 1rem;
  line-height: 1.6;
}

.info-text {
  font-size: 1.1rem;
  color: var(--text-default, #333);
}

.list-group-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f9fa;
}

.copy-button {
  font-size: 0.875rem;
  cursor: pointer;
}

.iban,
.bic {
  font-family: monospace;
  font-size: 1rem;
  color: var(--primary-color, #007bff);
}

a.text-primary {
  text-decoration: none;
}

a.text-primary:hover {
  text-decoration: underline;
}
</style>
