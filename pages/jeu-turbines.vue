<template>
    <div class="min-h-screen bg-slate-50">
        <header class="bg-white shadow-sm p-4 mb-8 fixed w-full z-10">
            <div class="container mx-auto flex justify-between items-center">
                <h1 class="text-2xl font-bold text-blue-600">Circuit des turbines à Gaz</h1>
                <div class="flex items-center gap-4">
                    <div class="flex items-center gap-2">
                        <span class="font-semibold">votre score: {{ score }}/{{ safeCircuitData.elements.length
                            }}</span>
                        <span class="font-semibold ml-4">Temps restant: {{ timeLeft }}s</span>
                    </div>
                </div>
            </div>
        </header>

        <GameInstructions />

        <main class="container mx-auto mt-24 grid grid-cols-12 gap-6">
            <div class="col-span-3">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Composants</h2>
                    </div>
                    <div class="card-content">
                        <div class="components-list">
                            <div v-for="item in shuffledElements" :key="item.nom" class="draggable-component"
                                :class="{ 'used': isItemUsed(item), 'pointer-events-none opacity-50': isGameOver }"
                                :draggable="!isItemUsed(item) && !isGameOver" @dragstart="startDrag($event, item)">
                                <div class="flex items-center gap-2">
                                    <div class="component-image-container is-flex flex-wrap relative">
                                        <div v-if="imageLoading[item.nom]"
                                            class="spinner absolute inset-0 flex items-center justify-center">
                                            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600">
                                            </div>
                                        </div>
                                        <img :src="item.image" :alt="item.nom" width="120" height="120"
                                            class="component-image" />
                                    </div>
                                    <span class="font-medium">{{ item.nom }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-6">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Zone de construction</h2>
                    </div>
                    <div class="card-content">
                        <div class="drop-zones">
                            <div v-for="(zone, index) in safeCircuitData.elements" :key="index" class="drop-zone"
                                :class="{ 'pointer-events-none opacity-50': isGameOver }" @dragover.prevent
                                @drop="onDrop($event, index)">
                                <div v-if="placedItems[index]" class="placed-item">
                                    <img :src="placedItems[index].image" :alt="placedItems[index].nom">
                                    <p>{{ placedItems[index].nom }}</p>
                                </div>
                                <div v-else class="empty-zone">
                                    <span class="text-gray-400">Position {{ index + 1 }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col-span-3">
                <div class="card">
                    <div class="card-header">
                        <h2 class="card-title">Information</h2>
                    </div>
                    <div class="card-content">
                        <div v-if="selectedItem" class="info-panel">
                            <h3 class="font-medium text-blue-800">{{ selectedItem.nom }}</h3>
                            <p class="text-sm text-blue-600 mt-1">{{ selectedItem.fonction }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>

        <div v-if="isGameOver" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
                <h2 class="text-2xl font-bold mb-4">Temps écoulé !</h2>
                <p class="text-lg mb-2">Votre score final est : {{ score }}/{{ safeCircuitData.elements.length }}</p>
                <p class="text-md text-blue-600 mb-4">{{ getFinalEvaluation }}</p>
                <button @click="$router.push('/')"
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Retour à l'accueil
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCircuitTurbinesGaz } from '~/composables/useCircuitTurbinesGaz'
import GameInstructions from '~/components/games/GameInstructions.vue'

const { $swal } = useNuxtApp()
const { circuitData } = useCircuitTurbinesGaz()
const placedItems = ref({})
const selectedItem = ref(null)
const score = ref(0)
const timeLeft = ref(60)
const isGameOver = ref(false)
const timer = ref(null)
const imageLoading = ref({})

const defaultCircuitData = {
    elements: []
}

const safeCircuitData = computed(() => {
    return circuitData.value || defaultCircuitData
})

const shuffledElements = computed(() => {
    return [...(safeCircuitData.value.elements || [])].sort(() => Math.random() - 0.5)
})

const getFinalEvaluation = computed(() => {
    const percentage = (score.value / safeCircuitData.value.elements.length) * 100
    if (percentage === 100) return "Excellent ! Parfaite maîtrise du circuit !"
    if (percentage >= 75) return "Très bien ! Presque parfait !"
    if (percentage >= 50) return "Bien ! Continuez vos efforts !"
    return "Continuez à vous entraîner !"
})

const startTimer = () => {
    timer.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        } else {
            clearInterval(timer.value)
            isGameOver.value = true
        }
    }, 1000)
}

const isItemUsed = (item) => {
    // return Object.values(placedItems.value).some(placedItem => placedItem.nom === item.nom)
    return false // Désactive la vérification, permettant de réutiliser les composants

}

const startDrag = (event, item) => {
    if (!isGameOver.value) {
        event.dataTransfer.dropEffect = 'move'
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('itemIndex', item.position)
        selectedItem.value = item
    }
}

const onDrop = (event, index) => {
    if (!isGameOver.value) {
        const itemPosition = event.dataTransfer.getData('itemIndex')
        const droppedItem = safeCircuitData.value.elements.find(item => item.position === itemPosition)

        if (droppedItem) {
            placedItems.value[index] = droppedItem
            checkScore()
        }
    }
}

const checkScore = () => {
    const previousScore = score.value
    score.value = Object.entries(placedItems.value).reduce((acc, [index, item]) => {
        const correctItem = safeCircuitData.value.elements[index]
        return acc + (item.nom === correctItem.nom ? 1 : 0)
    }, 0)

    if (score.value > previousScore) {
        $swal.fire({
            title: 'Correct !',
            text: 'Bien joué !',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            toast: true
        })
    } else {
        $swal.fire({
            title: 'Attention',
            text: 'Mauvais ordre, essayez encore !',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            toast: true
        })
    }

    if (score.value === safeCircuitData.value.elements.length) {
        $swal.fire({
            title: 'Félicitations !',
            text: 'Vous avez complété le circuit parfaitement !',
            icon: 'success',
            timer: 2500,
            showConfirmButton: false,
            toast: true
        })
    }
}

onMounted(() => {
    startTimer()
    safeCircuitData.value.elements.forEach(item => {
        imageLoading.value[item.nom] = true
    })
})

onBeforeUnmount(() => {
    if (timer.value) clearInterval(timer.value)
});
</script>


<style lang="scss" scoped>
.card {
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.card-header {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1f2937;
}

.card-content {
    padding: 1rem;
}

.components-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid #ddd;
    padding: 10px;
    min-height: 400px;
}

.draggable-component {
    background-color: #eff6ff;
    border-radius: 0.375rem;
    padding: 0.75rem;
    cursor: move;
    transition: background-color 0.2s;

    &:hover {
        background-color: #dbeafe;
    }

    &.used {
        opacity: 0.5;
        cursor: not-allowed;
        background-color: #f3f4f6;
    }
}

.component-image-container {
    width: 2.5rem;
    height: 2.5rem;
    background-color: #dbeafe;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}

.component-image {
    width: 2rem;
    height: 2rem;
    object-fit: cover;
    border-radius: 0.25rem;
    max-width: 100%;
    height: auto;
    margin-bottom: 5px;
}

.drop-zones {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 500px;
}

.drop-zone {
    height: 6rem;
    background-color: #f9fafb;
    border: 2px dashed #ccc;
    border-radius: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    padding: 10px;
    transition: border-color 0.2s;

    &:hover {
        border-color: #93c5fd;
    }
}

.empty-zone {
    color: #9ca3af;
}

.info-panel {
    background-color: #eff6ff;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #ddd;
    min-height: 400px;
}

.placed-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    img {
        max-width: 120px;
        height: auto;
    }
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}

:global(.swal2-container) {
    position: fixed;
    top: 20px !important;
    right: 20px !important;
    left: auto !important;
    bottom: auto !important;
    padding: 0;
}

:global(.swal2-popup) {
    width: 300px;
    margin: 0;
    padding: 1rem;
    font-family: system-ui, -apple-system, sans-serif;
    border-radius: 1rem;
}

:global(.swal2-title) {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    color: #2563eb;
    font-weight: 700;
}

:global(.swal2-html-container) {
    margin: 0;
    font-size: 0.875rem;
    color: #374151;
}

.swal2-icon.swal2-success {
    border-color: #4CAF50;
}

.swal2-icon.swal2-error {
    border-color: #FF5252;
}

.swal2-container {
    padding: 1rem;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutUp {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

.swal2-show {
    animation: fadeInDown 0.3s;
}

.swal2-hide {
    animation: fadeOutUp 0.2s;
}

.placed-item {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;

    img {
        max-width: 120px;
        height: auto;
    }
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}

/* Styles pour SweetAlert2 */
:global(.swal2-popup) {
    font-family: 'Poppins', sans-serif;
    border-radius: 1rem;
    width: auto;
    max-width: 400px;
    padding: 1.5rem;
}

:global(.swal2-title) {
    color: #2563eb;
    font-size: 1.25rem;
    font-weight: 700;
}

:global(.swal2-html-container) {
    color: #374151;
}

:global(.swal2-icon.swal2-success) {
    border-color: #4CAF50;
}

:global(.swal2-icon.swal2-error) {
    border-color: #FF5252;
}

:global(.swal2-container) {
    padding: 1rem;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeOutUp {
    from {
        opacity: 1;
        transform: translateY(0);
    }

    to {
        opacity: 0;
        transform: translateY(-10px);
    }
}

:global(.swal2-show) {
    animation: fadeInDown 0.3s;
}

:global(.swal2-hide) {
    animation: fadeOutUp 0.2s;
}
</style>