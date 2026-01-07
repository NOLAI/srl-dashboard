<template>
    <v-row>
        <v-card flat color="transparent" min-width="100%">
            <EssaySelector />
            <v-tabs v-model="tab">
                <v-tab value="timeline">
                    {{ $t("general.timelineTab") }}
                </v-tab>
                <v-tab value="questions">
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