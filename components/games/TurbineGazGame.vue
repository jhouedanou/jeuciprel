<template>
    <div class="container-fluid" v-if="circuitData && circuitData.elements">
        <div class="row">
            <!-- Colonne des composants à glisser -->
            <div class="col-md-2">
                <div class="components-list">
                    <div v-for="item in shuffledElements" :key="item.nom" class="draggable-item" draggable="true"
                        @dragstart="startDrag($event, item)">
                        <img :src="item.image" :alt="item.nom" class="component-image">
                        <p>{{ item.nom }}</p>
                    </div>
                </div>
            </div>

            <!-- Zone de dépôt centrale -->
            <div class="col-md-8">
                <div class="drop-zones">
                    <div v-for="(zone, index) in circuitData.elements" :key="index" class="drop-zone" @dragover.prevent
                        @drop="onDrop($event, index)">
                        <div v-if="placedItems[index]" class="placed-item">
                            <img :src="placedItems[index].image" :alt="placedItems[index].nom">
                            <p>{{ placedItems[index].nom }}</p>
                        </div>
                        <div v-else class="empty-zone">
                            Position {{ index + 1 }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Colonne d'information -->
            <div class="col-md-2">
                <div class="info-panel">
                    <h3>Information</h3>
                    <p>Score actuel: {{ score }}/{{ circuitData.elements.length }}</p>
                    <div v-if="selectedItem">
                        <h4>{{ selectedItem.nom }}</h4>
                        <p>{{ selectedItem.fonction }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCircuitTurbinesGaz } from '~/composables/useCircuitTurbinesGaz'

const { circuitData } = useCircuitTurbinesGaz()
const placedItems = ref({})
const selectedItem = ref(null)
const score = ref(0)

const shuffledElements = computed(() => {
    if (!circuitData.value?.elements) return []
    return [...circuitData.value.elements].sort(() => Math.random() - 0.5)
})

const startDrag = (event, item) => {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('itemIndex', item.position)
    selectedItem.value = item
}

const onDrop = (event, index) => {
    const itemPosition = event.dataTransfer.getData('itemIndex')
    const droppedItem = circuitData.value.elements.find(item => item.position === itemPosition)

    if (droppedItem) {
        placedItems.value[index] = droppedItem
        checkScore()
    }
}

const checkScore = () => {
    score.value = Object.entries(placedItems.value).reduce((acc, [index, item]) => {
        const correctItem = circuitData.value.elements[index]
        return acc + (item.nom === correctItem.nom ? 1 : 0)
    }, 0)
}
</script>

<style scoped>
.components-list {
    border: 1px solid #ddd;
    padding: 10px;
    min-height: 400px;
}

.draggable-item {
    cursor: move;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.component-image {
    width: 100%;
    height: auto;
    margin-bottom: 5px;
}

.drop-zones {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.drop-zone {
    border: 2px dashed #ccc;
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
}

.empty-zone {
    color: #666;
}

.info-panel {
    border: 1px solid #ddd;
    padding: 15px;
    min-height: 400px;
}

.placed-item {
    width: 100%;
    text-align: center;
}

.placed-item img {
    max-width: 200px;
    height: auto;
}
</style>
