<template>
    <v-row no-gutters>
        <v-col class="text-right">
            <v-btn icon="mdi-minus" @click="props.zoomOut" :disabled="props.zoom <= 100"></v-btn>
            <span class="mx-4">Zoom: {{ props.zoom }}%</span>
            <v-btn icon="mdi-plus" @click="props.zoomIn"></v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
const props = defineProps({
    zoom: Number,
    zoomIn: Function,
    zoomOut: Function,
});
</script>