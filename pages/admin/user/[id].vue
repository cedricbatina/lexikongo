<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <!-- Liste des mots -->
      <div class="col-md-8 col-sm-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <UserDetails />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Ajouter des styles pour espacer et donner un look plus professionnel */
.card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease-in-out;
  border: none;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
}

.card-body {
  padding: 2rem;
}

.container {
  max-width: 1200px;
}

h4 {
  color: #007bff;
  font-weight: 600;
}
</style>
