<template>
    <v-row>
        <v-card flat color="transparent" min-width="100%">
            <EssaySelector />
            <v-tabs v-model="tab" @update:model-value="val => track('tab_changed', { tab: val })">
                <v-tab value="timeline">
                    {{ $t("general.timelineTab") }}
                </v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="timeline">
                        <TimelineTab />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script setup>
import TimelineTab from "./TimelineTab.vue";
import EssaySelector from "./EssaySelector.vue";
import { ref } from "vue";
import { track } from "@/logic/tracking";

const tab = ref("timeline");
</script>

<style scoped>
.v-btn {
    font-family: "Noto Sans";
    font-weight: bold;
    font-size: 16pt;
    color: #2c3e50;
    text-decoration: none;
    margin-right: 20px;
    padding-bottom: 2px;
    text-transform: none;
    letter-spacing: normal;
}

.tabLinks {
    margin-bottom: 20px
}

#mainTabs {
    width: 100%;
}
</style>