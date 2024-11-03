<template>
  <div class="container mt-5">
    <div class="row justify-content-between">
      <!-- Liste des mots -->
      <div class="col-md-8 col-sm-12 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-primary mb-4 text-left">
              Liste des Mots
            </h2>
            <WordList />
            <div class="row mt-4">
              <div class="col-md-12 d-flex justify-content-center">
                <div class="btn-group" role="group" aria-label="Admin actions">
                  <nuxt-link to="/admin/admin-add-word">
                    <button
                      class="btn btn-primary btn-sm mx-2 d-flex align-items-center"
                    >
                      <i class="fa-solid fa-plus me-1"></i> Ajouter un mot
                    </button>
                  </nuxt-link>
                  <nuxt-link to="/admin/admin-add-verb">
                    <button
                      class="btn btn-primary btn-sm mx-2 d-flex align-items-center"
                    >
                      <i class="fa-solid fa-plus me-1"></i> Ajouter un verbe
                    </button>
                  </nuxt-link>

                  <nuxt-link to="/admin/admin-add-user">
                    <button
                      class="btn btn-primary btn-sm mx-2 d-flex align-items-center"
                    >
                      <i class="fa-solid fa-user-plus me-1"></i> Ajouter un
                      utilisateur
                    </button>
                  </nuxt-link>
                  <nuxt-link to="/">
                    <button
                      class="btn btn-secondary btn-sm mx-2 d-flex align-items-center"
                    >
                      <i class="fas fa-home me-2"></i> Retour à l'accueil
                    </button>
                  </nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Menu Secondaire -->
      <div class="col-md-3 col-sm-12">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="text-primary text-center">Menu</h5>
            <MenuSecondaire />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
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

h2 {
  color: #007bff;
  font-weight: 600;
}
</style>
