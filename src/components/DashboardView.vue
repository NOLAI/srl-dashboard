<template>
    <v-row>
        <v-card flat>
            <EssaySelector />
            <v-tabs v-model="tab" @update:model-value="val => track('tab_changed', { tab: val })">
                <v-tab value="timeline" class="mr-5 font-bold normal-case text-lg">
                    {{ $t("general.timelineTab") }}
                </v-tab>
                <v-tab value="questions" class="font-bold normal-case text-lg">
                    {{ $t("general.questionsTab") }}
                </v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="timeline">
                        <TimelineTab />
                    </v-window-item>
                    <v-window-item value="questions">
                        <QuestionsTab />
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>
    </v-row>
</template>

<script setup>
import TimelineTab from "./TimelineTab.vue";
import QuestionsTab from "./QuestionsTab.vue";
import EssaySelector from "./EssaySelector.vue";
import { ref } from "vue";
import { track } from "@/logic/tracking";

const tab = ref("timeline");
</script>