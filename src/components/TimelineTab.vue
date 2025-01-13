<template>
    <v-container fluid>
        <v-row id="tab-info">
            <TabTopInfo :zoom="zoom" :zoomIn="() => { zoom += 25 }" :zoomOut="() => { zoom -= 25 }" />
        </v-row>
        <template v-if="essays.selected.length == 1">
            <v-row id="timelines">
                <div class="timeline-wrapper" ref="timelines">
                    <h3>{{ $i18n.locale == 'nl' ? essays.selected[0].name_nl : essays.selected[0].name_en }}</h3>
                    <div class="timeline-container">
                        <TimelineChart :course_id="essays.selected[0].course_id" :combined="false" class="timeline"
                            :zoom="zoom" />
                    </div>
                </div>
            </v-row>
            <v-row>
                <v-col cols="8">
                    <GoalsInfo :course_id="essays.selected[0].course_id" />
                </v-col>
                <v-col cols="4" class="px-8">
                    <v-row>
                        <v-col cols="6" class="pr-8">
                            <FractionInfo
                                :title="$i18n.locale == 'nl' ? essays.selected[0].name_nl : essays.selected[0].name_en"
                                :course_id="essays.selected[0].course_id" type="metacognition" />
                        </v-col>
                        <v-col cols="6" class="pl-8">
                            <FractionInfo
                                :title="$i18n.locale == 'nl' ? essays.selected[0].name_nl : essays.selected[0].name_en"
                                :course_id="essays.selected[0].course_id" type="cognition" />
                        </v-col>
                    </v-row>
                    <HoverInfo class="mt-8" />
                </v-col>

            </v-row>
        </template>
        <template v-else-if="essays.selected.length > 1">
            <v-row id="timelines">
                <div :key="essay.course_id" v-for="essay in essays.selected" class="timeline-wrapper" ref="timelines">
                    <h3>{{ $i18n.locale == 'nl' ? essay.name_nl : essay.name_en }}</h3>
                    <div class="timeline-container" @scroll="synchronizeScroll">
                        <TimelineChart :course_id="essay.course_id" :combined="true" class="timeline" :zoom="zoom" />
                    </div>
                </div>
            </v-row>
            <v-row>
                <v-row>
                    <v-col cols="4" class="px-8">
                        <HoverInfo />
                    </v-col>
                    <v-col :key="essay.course_id" :cols="Math.floor(8 / essays.selected.length)"
                        class="explainer-col px-8" v-for="essay in essays.selected">
                        <FractionInfo :title="$i18n.locale == 'nl' ? essay.name_nl : essay.name_en"
                            :course_id="essay.course_id" :show_percentage="true" />
                    </v-col>
                </v-row>
            </v-row>
        </template>
        <template v-else>
            <v-row id="timelines">
                <div class="timeline-wrapper">
                    <h1>Er zijn geen betogen geselecteerd.</h1>
                </div>
            </v-row>
        </template>
    </v-container>
</template>

<script setup>
import TimelineChart from "./TimelineChart.vue";
import TabTopInfo from "./info/TabTopInfo.vue";
import GoalsInfo from "./info/GoalsInfo.vue";
import HoverInfo from "./info/HoverInfo.vue";
import FractionInfo from "./info/FractionInfo.vue";
import { ref, useTemplateRef } from "vue";
import { essays } from "@/logic/essay";

const zoom = ref(100);
const timelines = useTemplateRef('timelines');

const synchronizeScroll = (event) => {
    for (let element of timelines.value) {
        element.querySelector('.timeline-container').scrollLeft = event.target.scrollLeft;
    }
}
</script>

<style scoped>
#tab-info {
    margin-top: 5px;
}

#timelines {
    margin-bottom: 50px;
}

.timeline-wrapper {
    width: 100%;
    margin-top: 20px;
    margin-bottom: -20px;
}

.timeline-container {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
}
</style>