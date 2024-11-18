<template>
    <div v-if="isVisible" :class="['toast', type]">
        {{ message }}
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
    type: String,
    isVisible: Boolean
})
</script>

<style scoped>
.toast {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 1rem;
    border-radius: 0.5rem;
    color: white;
    z-index: 50;
}

.success {
    background-color: #10B981;
}

.error {
    background-color: #EF4444;
}
</style>
