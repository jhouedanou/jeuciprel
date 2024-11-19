<script setup lang="ts">
const pageTransition = {
    name: 'page',
    mode: 'out-in'
}
</script>
<template>
    <div
        class="min-h-screen bg-[#f0f7ff] is-flex is-justify-content-center is-flex-direction-column is-align-items-center">


        <main
            class="container mx-auto px-4 pt-24 is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-[#1a237e] mb-4">Nos installations</h1>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <nuxt-link to="/jeu-turbines" class="text-decoration-none">
                    <div class="card hover:transform hover:scale-105 transition-all duration-300">
                        <div class="p-6 text-center">
                            <h2 class="text-2xl font-bold text-[#1a237e] mb-4">Circuit de turbine à gaz</h2>
                            <nuxt-img src="images/turbine.webp" format="webp" quality="80"
                                class="mx-auto mb-6 rounded-lg shadow-lg" alt="Turbine à gaz" />
                            <p class="card-text">
                                La centrale thermique dispose d'un parc de six turbines à gaz : trois unités de 33 MW et
                                trois unités de 111 MW, représentant une capacité totale installée de 432 MW.
                            </p>
                            <button class="btn btn-primary">Sélectionner</button>

                        </div>
                    </div>
                </nuxt-link>

                <nuxt-link to="/jeu-cycle-combine" class="text-decoration-none">
                    <div class="card hover:transform hover:scale-105 transition-all duration-300">
                        <div class="p-6 text-center">
                            <h2 class="text-2xl font-bold text-[#1a237e] mb-4">Cycle combiné</h2>
                            <nuxt-img src="images/cyclecombine.webp" format="webp" quality="80"
                                class="mx-auto mb-6 rounded-lg shadow-lg" alt="Cycle combiné" />
                            <p class="card-text">Notre centrale thermique à cycle combiné permet d’éviter le rejet de
                                près de 500 000 tonnes de CO2 dans l’atmosphère de la Côte d’Ivoire.</p>
                            <button class="btn btn-primary">Sélectionner</button>
                        </div>
                    </div>
                </nuxt-link>
            </div>
        </main>
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
