<template>
  <div>
    <section class="text-center mt-4" aria-labelledby="contribute-section">
      <p id="contribute-section" class="text-default">
        Vous ne trouvez pas l'expression que vous cherchez ? <br />
        Contribuez à enrichir le lexique en ajoutant de nouvelles expressions.
      </p>
      <NuxtLink
        to="/documentation/for-contributors"
        class="btn btn-outline-success btn-lg m-2"
        aria-label="Rejoignez les contributeurs pour enrichir le lexique"
      >
        <i class="fas fa-hands-helping me-2" aria-hidden="true"></i>
        Rejoignez les Contributeurs
      </NuxtLink>
      <NuxtLink
        to="/contact"
        class="btn btn-outline-primary btn-lg m-2"
        aria-label="Contactez-nous pour toute assistance ou suggestion"
      >
        <i class="fas fa-envelope me-2" aria-hidden="true"></i>
        Contactez-nous
      </NuxtLink>
    </section>
  </div>
</template>