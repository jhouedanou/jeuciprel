<template>
    <div class="min-h-screen bg-slate-50">
        <header class="bg-white shadow-sm p-4 sticky fixed top-0 z-50 transition-all duration-200 dss">
            <div class="container mx-auto flex justify-between items-center logowrapper">
                <div class="columns">
                    <div class="column is-4 rihanna">
                        <img src="/images/logo.webp" alt="Logo" class="h-10" style="height:80px;" />
                    </div>
                    <div class="column is-8 cassie is-flex is-justify-content-end p-0">
                        <div class="insidelogowrapper">
                            <h5 class="text-2xl font-bold text-blue-600">Circuit des turbines à Gaz</h5>

                        </div>
                    </div>
                </div>
            </div>
        </header>

        <GameInstructions />
        <div class="game-container container">
            <main class="columns">
                <div class="column is-4">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Composants</h2>
                        </div>
                        <div class="card-content">
                            <div class="components-list">
                                <div v-for="item in shuffledElements" :key="item.nom" class="draggable-component"
                                    :class="{ 'used': isItemUsed(item), 'pointer-events-none opacity-50': isGameOver }"
                                    :draggable="!isItemUsed(item) && !isGameOver" @dragstart="startDrag($event, item)">
                                    <div class="is-flex flex-wrap relative shyne">
                                        <div class="component-image-container is-flex flex-wrap relative">
                                            <div v-if="imageLoading[item.nom]"
                                                class="spinner absolute inset-0 flex items-center justify-center">
                                                <div
                                                    class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600">
                                                </div>
                                            </div>
                                            <img :src="item.image" :alt="item.nom" width="220" height="220"
                                                class="component-image" />
                                        </div>
                                        <span class="font-medium didddy">{{ item.nom }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-5">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Zone de construction</h2>
                        </div>
                        <div class="card-content">
                            <div class="drop-zones">
                                <div v-for="(zone, index) in safeCircuitData.elements" :key="index" class="drop-zone"
                                    :class="{ 'pointer-events-none opacity-50': isGameOver }" @dragover.prevent
                                    @drop="onDrop($event, index)">
                                    <div v-if="placedItems[index]"
                                        class="placed-item bg-[#f3f6fd] rounded-lg transition-all hover:shadow-md w-full h-full flex flex-col items-center justify-center shynepo">
                                        <img :src="placedItems[index].image" :alt="placedItems[index].nom">
                                        <div class="obama">

                                            <h3 class="font-medium text-[#1a237e] mt-2">{{ placedItems[index].nom }}
                                            </h3>
                                            <p>{{ placedItems[index].fonction }}</p>
                                        </div>
                                    </div>

                                    <div v-else class="empty-zone">
                                        <span class="text-gray-400">Position {{ index + 1 }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="column is-3">
                    <div class="card">
                        <div class="card-header">
                            <h2 class="card-title">Information</h2>
                        </div>
                        <div class="card-content">
                            <!-- <div v-if="selectedItem" class="info-panel">
                                <h3 class="font-medium text-blue-800">{{ selectedItem.nom }}</h3>
                                <p class="text-sm text-blue-600 mt-1">{{ selectedItem.fonction }}</p>
                            </div> -->
                            <div class="chronograph absolute top-4 right-4 z-50">
                                <svg class="progress-ring" width="60" height="60">
                                    <circle class="progress-ring__circle" :style="{
                                        strokeDashoffset: `${calculateOffset()}px`,
                                        stroke: timeLeft <= 10 ? '#dc2626' : '#16a34a'
                                    }" stroke-width="4" fill="transparent" r="26" cx="30" cy="30" />
                                </svg>
                                <div class="chronograph-text" :class="{ 'text-red-600': timeLeft <= 10 }">
                                    {{ timeLeft }} <p>secondes</p>
                                </div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="flex items-center gap-2">
                                    <p class="font-semibold" :class="{
                                        'score-text red': score < 3,
                                        'score-text orange': score >= 3 && score < 4,
                                        'score-text green': score >= 4
                                    }">
                                        votre score: {{ score }}/{{ safeCircuitData.elements.length }}
                                    </p>
                                    <p class="font-semibold" :class="{ 'score-text red': timeLeft <= 10 }">
                                        Temps restant: {{ timeLeft }}s
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>


        <div v-if="isGameOver"
            class="gameOver fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
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

const calculateOffset = () => {
    const circumference = 2 * Math.PI * 26;
    const progress = (timeLeft.value / 60) * circumference;
    return circumference - progress;
}
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
            toast: true,
            customClass: {
                popup: 'score-increase'
            }
        })
    } else {
        $swal.fire({
            title: 'Attention',
            text: 'Mauvais ordre, essayez encore !',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            customClass: {
                popup: 'score-decrease'
            }
        })
    }

    if (score.value === safeCircuitData.value.elements.length) {
        $swal.fire({
            title: 'Félicitations !',
            text: 'Vous avez complété le circuit parfaitement !',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            toast: true,
            customClass: {
                popup: 'score-perfect'
            }
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


<style lang="scss" scoped></style>