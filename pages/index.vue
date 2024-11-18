<script setup lang="ts">
const pageTransition = {
    name: 'page',
    mode: 'out-in'
}
</script>

<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
        <div class="row">
            <div class="col-12 text-center mb-5">
                <h1 class="display-4">Sélectionnez votre type d'installation</h1>
            </div>
            <div class="col-md-6">
                <nuxt-link to="/jeu-turbines" class="text-decoration-none">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2 class="card-title">Circuit de turbine à gaz</h2>
                            <nuxt-img src="images/turbine.webp" format="webp" quality="80" class="img-fluid mb-3"
                                alt="Turbine à gaz"></nuxt-img>
                            <p class="card-text">Analyse et simulation de circuit de turbine à gaz</p>
                            <button class="btn btn-primary">Sélectionner</button>
                        </div>
                    </div>
                </nuxt-link>
            </div>
            <div class="col-md-6">
                <nuxt-link to="/jeu-cycle-combine" class="text-decoration-none">
                    <div class="card h-100">
                        <div class="card-body text-center">
                            <h2 class="card-title">Cycle combiné</h2>
                            <nuxt-img src="images/cyclecombine.webp" format="webp" quality="80" class="img-fluid mb-3"
                                alt="Cycle combiné"></nuxt-img>
                            <p class="card-text">Analyse et simulation de cycle combiné</p>
                            <button class="btn btn-primary">Sélectionner</button>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    cursor: pointer;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

img {
    max-height: 200px;
    object-fit: cover;
}

.page-enter-active,
.page-leave-active {
    transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
    opacity: 0;
}
</style>
