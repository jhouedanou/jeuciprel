<template>
    <div v-if="isVisible" class="instruction-overlay">
        <div class="instruction-modal">
            <h2 class="text-center mb-4">Comment jouer ?</h2>
            <div class="dude">
                <img src="/images/dude.webp" alt="Dude" class="dude-image" />
            </div>
            <!-- Instructions Desktop -->
            <div class="instructions">
                <div class="instruction-step">
                    <i class="fas fa-arrows-alt"></i>
                    <p>Faites glisser les composants dans le bon ordre afin de produire de l'électricité</p>
                </div>

            </div>

            <!-- Instructions Mobile -->
            <div class="instructions-mobile">
                <div class="instruction-step">
                    <i class="fas fa-hand-pointer"></i>
                    <p>Touchez un composant</p>
                </div>

                <div class="instruction-step">
                    <i class="fas fa-arrows-alt"></i>
                    <p>Cliquez sur la position concernée pour le déplacer vers la zone souhaitée</p>
                </div>

            </div>

            <button @click="startGame" class="start-button">
                Commencer
            </button>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue'

const isVisible = ref(true)
const emit = defineEmits(['start-game'])

const startGame = () => {
    isVisible.value = false

    emit('start-game')
};
</script>

<style scoped>
.instruction-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

.instruction-modal {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    max-width: 500px;
    width: 90%;
}

.instructions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 2rem 0;
}

.instruction-step {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.instruction-step i {
    font-size: 1.5rem;
    color: #2c3e50;
}

.start-button {
    display: block;
    width: 100%;
    padding: 1rem;
    background: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s;
}

.start-button:hover {
    background: #3aa876;
}
</style>
