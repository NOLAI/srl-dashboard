<template>
    <v-row class="explainer-heading">
        <h2 class="text-lg font-bold">
            {{ $t(processState.selected || processState.lastHover ? "process." + (processState.selected ??
                processState.lastHover) :
                'explanation.title') }}
        </h2>
        <hr class="border-t-2 mt-3 mb-4 w-full" />
        <p>
            {{ $t(processState.selected || processState.lastHover ? "explanation." + (processState.selected ??
                processState.lastHover) :
                'explanation.title') }}
        </p>
    </v-row>
</template>

<script setup>
import { processState } from "@/logic/process";
</script>