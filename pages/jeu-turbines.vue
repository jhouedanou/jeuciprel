<template>
    <div class="min-h-screen bg-slate-50">
        <header class="bg-white shadow-sm p-4 mb-8 fixed">
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

        <main class="container mx-auto mt-8 grid grid-cols-12 gap-6">
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
                                    <div class="component-image-container is-flex flex-wrap">
                                        <nuxt-img :src="item.image" :alt="item.nom" width="120" height="120" fit="cover"
                                            class="component-image" format="webp" quality="80" />
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
import { useToast } from 'vue-toastification'

const toast = useToast()
const { circuitData } = useCircuitTurbinesGaz()
const placedItems = ref({})
const selectedItem = ref(null)
const score = ref(0)
const timeLeft = ref(120)
const isGameOver = ref(false)
const timer = ref(null)

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
    return Object.values(placedItems.value).some(placedItem => placedItem.nom === item.nom)
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
        toast.success("Correct ! Bien joué !", {
            timeout: 2000,
            position: "top-right"
        })
    } else {
        toast.error("Mauvais ordre, essayez encore !", {
            timeout: 2000,
            position: "top-right"
        })
    }

    if (score.value === safeCircuitData.value.elements.length) {
        toast.success("Félicitations ! Vous avez complété le circuit parfaitement !", {
            timeout: 3000,
            position: "top-center"
        })
    }
}

onMounted(() => {
    startTimer()
})

onBeforeUnmount(() => {
    if (timer.value) clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.card {
    @apply bg-white rounded-lg shadow-sm;
}

.card-header {
    @apply p-4 border-b border-gray-200;
}

.card-title {
    @apply text-xl font-semibold text-gray-800;
}

.card-content {
    @apply p-4;
}

.components-list {
    @apply space-y-4;
    border: 1px solid #ddd;
    padding: 10px;
    min-height: 400px;
}

.draggable-component {
    @apply bg-blue-50 rounded p-3 cursor-move hover:bg-blue-100 transition-colors;
}

.draggable-component.used {
    @apply opacity-50 cursor-not-allowed bg-gray-100;
}

.component-image-container {
    @apply w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center;
}

.component-image {
    @apply w-8 h-8 object-cover rounded;
    max-width: 100%;
    height: auto;
    margin-bottom: 5px;
}

.drop-zones {
    @apply grid grid-cols-1 gap-4 min-h-[500px];
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.drop-zone {
    @apply h-24 bg-gray-50 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-blue-300 transition-colors;
    border: 2px dashed #ccc;
    min-height: 100px;
    padding: 10px;
}

.empty-zone {
    @apply text-gray-400;
    color: #666;
}

.info-panel {
    @apply bg-blue-50 p-4 rounded-lg;
    border: 1px solid #ddd;
    padding: 15px;
    min-height: 400px;
}

.placed-item {
    @apply w-full h-full flex flex-col items-center justify-center;
    width: 100%;
    text-align: center;
}

.placed-item img {
    @apply max-w-[120px] h-auto;
    max-width: 200px;
}

.backdrop-blur-sm {
    backdrop-filter: blur(4px);
}
</style>