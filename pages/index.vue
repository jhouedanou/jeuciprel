<script setup lang="ts">
const router = useRouter();
const navigateToTurbine = () => router.push('/jeu-turbines');
const navigateToCycle = () => router.push('/jeu-cycle-combine');
</script>

<template>
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
        <div class="row">
            <div class="col-12 text-center mb-5">
                <h1 class="display-4">Sélectionnez votre type d'installation</h1>
            </div>
            <div class="col-md-6">
                <div class="card h-100" @click="navigateToTurbine">
                    <div class="card-body text-center">
                        <h2 class="card-title">Circuit de turbine à gaz</h2>
                        <nuxt-img src="images/turbine.webp" format="webp" quality="80" class="img-fluid mb-3"
                            alt="Turbine à gaz"></nuxt-img>
                        <p class="card-text">Analyse et simulation de circuit de turbine à gaz</p>
                        <button class="btn btn-primary">Sélectionner</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card h-100" @click="navigateToCycle">
                    <div class="card-body text-center">
                        <h2 class="card-title">Cycle combiné</h2>
                        <nuxt-img src="images/cyclecombine.webp" format="webp" quality="80" class="img-fluid mb-3"
                            alt="Cycle combiné"></nuxt-img>
                        <p class="card-text">Analyse et simulation de cycle combiné</p>
                        <button class="btn btn-primary">Sélectionner</button>
                    </div>
                </div>
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
</style>
