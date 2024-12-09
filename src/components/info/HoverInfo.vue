<template>
    <v-row class="explainer-heading">
        <span>
            {{ $t(process.last_hover ? "process." + (process.selected ?? process.last_hover) :
                'explanation.title') }}
        </span>
        <v-divider />
        <p>
            {{ $t(process.last_hover ? "explanation." + (process.selected ?? process.last_hover) :
                'explanation.title') }}
        </p>
    </v-row>
</template>

<script setup>
import { process } from "@/logic/process";
</script>

<style scoped></style>