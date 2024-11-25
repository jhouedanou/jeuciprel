<script setup lang="ts">

const pageTransition = {
    name: 'page',
    mode: 'out-in'
}

const showPopup = ref(true)
const closePopup = () => {
    showPopup.value = false
}
</script>
<template>
    <div
        class="home min-h-screen bg-[#f0f7ff] is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
        <div v-if="showPopup" class="popup-overlay">
            <div class="popup-content">
                <img src="/images/logo.webp" alt="Logo" class="popup-image" />
                <h2 class="popup-title">Jeu Lego Electrique</h2>
                <div class="popup-text">
                    <div class="dude">
                        <img src="/images/dude.webp" alt="Dude" class="dude-image" />
                    </div>
                    <div class="tex">

                        <p>Dans ce jeu interactif, plongez au cœur du processus de production d'électricité en
                            assemblant
                            les composants clés d'une centrale électrique.</p>
                        <p>Comme un ingénieur en pleine construction,
                            utilisez des blocs des composants clés pour recréer les différentes étapes et produire de
                            l'électricité. Votre mission ? Placer chaque élément dans le bon ordre pour faire
                            fonctionner la
                            centrale et produire de l'électricité.</p>
                        <br>
                        <p>Ce défi ludique et éducatif vous permettra de découvrir de manière amusante les technologies
                            et
                            les mécanismes essentiels derrière l'électricité qui alimente notre quotidien. Serez-vous à
                            la
                            hauteur ?</p>
                    </div>
                </div>
                <button @click="closePopup" class="close-button">Commencer</button>
            </div>
        </div>

        <main
            class="container mx-auto px-4 pt-24 is-flex is-justify-content-center is-flex-direction-column is-align-items-center">
            <div class="text-center mb-12">
                <h1 id="lestyle" class="text-4xl font-bold text-[#1a237e] mb-4">Nos installations</h1>
                <p></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 didq">
                <nuxt-link to="/jeu-turbines" class="text-decoration-none">
                    <div class="card hover:transform hover:scale-105 transition-all duration-300">
                        <div class="p-6 text-center">
                            <div class="johney"
                                style="background-image: url('images/circuit_turbines_gaz/thumb.webp'); background-size: cover;">
                                <h2 class="text-2xl font-bold text-[#1a237e] mb-4">Turbines à gaz</h2>

                            </div>

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
                            <div class="johney"
                                style="background-image: url('images/circuit_cycle_combine/thumb.webp'); background-size: cover;">
                                <h2 class="text-2xl font-bold text-[#1a237e] mb-4">Cycle combiné</h2>
                            </div>

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
