<template>
    <v-row no-gutters>
        <v-col>
            <span class="tab-info-title">{{ $t("general.timelineTitle", { user: getUsername() }) }}</span>
            <br>
            <span class="tab-info-subtitle">{{ $t("general.timelineSubtitle") }}</span>
        </v-col>
        <v-col style="text-align: right;">
            <v-btn icon="mdi-minus" @click="zoomOut" :disabled="zoom <= 100"></v-btn>
            <span style="margin: 0 20px">Zoom: {{ zoom }}%</span>
            <v-btn icon="mdi-plus" @click="zoomIn"></v-btn>
        </v-col>
    </v-row>
</template>

<script>
import { GET_USERNAME } from "../../store/storeconstants";

export default {
    name: "TabTopInfo",
    props: ['zoom', 'zoomIn', 'zoomOut'],
    methods: {
        getUsername() {
            return this.$store.getters[`auth/${GET_USERNAME}`]
        },
    }
}
</script>

<style>
.tab-info-date {
    font-style: italic;
    font-size: 12pt;
    display: inline-block;
}

.tab-info-title {
    font-size: 16pt;
    font-weight: bold;
    display: inline-block;
    padding-top: 5px;
    padding-bottom: 5px;
}

.tab-info-big-title {
    font-size: 42pt;
}

.tab-info-subtitle {
    font-size: 12pt;
}
</style>