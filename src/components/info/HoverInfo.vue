<template>
    <v-row class="explainer-heading">
        <span>
            {{ $t(processState.selected || processState.lastHover ? "process." + (processState.selected ??
                processState.lastHover) :
                'explanation.title') }}
        </span>
        <v-divider />
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

<style scoped>
.explainer-heading>span {
    font-weight: 600;
    font-size: 13pt;
    text-align: left;
}

.v-divider {
    margin-top: 10px;
    margin-bottom: 15px;
    color: #000;
    border-top-width: 2px;
}
</style>