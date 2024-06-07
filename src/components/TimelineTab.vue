<template>
    <v-container fluid>
        <v-row id="tab-info">
            <TabTopInfo :zoom="zoom" :zoomIn="zoomIn" :zoomOut="zoomOut" />
        </v-row>
        <v-row id="timelines">
            <div v-if="getSelectedEssays().length == 1" class="timeline-wrapper">
                <h3>{{ getSelectedEssays()[0].name }}</h3>
                <div class="timeline-container">
                    <TimelineChart :series="getSelectedEssays()[0].meta" class="timeline" :zoom="zoom" />
                    <TimelineChart :series="getSelectedEssays()[0].cog" class="timeline" :zoom="zoom" />
                </div>
            </div>
            <template v-else-if="getSelectedEssays().length > 1">
                <div v-for="essay in getSelectedEssays()" class="timeline-wrapper">
                    <h3>{{ $i18n.locale == 'nl' ? essay.name_nl : essay.name_en }}</h3>
                    <div class="timeline-container" @scroll="synchronizeScroll">
                        <TimelineChart :series="essay.combined_series" class="timeline" :zoom="zoom" />
                    </div>
                </div>
            </template>
            <div v-else class="timeline-wrapper">
                <h1>Er zijn geen betogen geselecteerd.</h1>
            </div>
        </v-row>
        <v-row>
            <TabBottomInfo />
        </v-row>
    </v-container>
</template>

<script>
import TimelineChart from "./TimelineChart.vue";
import TabTopInfo from "./info/TabTopInfo.vue";
import TabBottomInfo from "./info/TabBottomInfo.vue";

export default {
    name: "TimelineTab",
    components: {
        TabBottomInfo,
        TabTopInfo,
        TimelineChart,
    },
    data: () => {
        return {
            zoom: 100,
        };
    },
    methods: {
        getSelectedEssays() {
            return this.$store.getters.selectedEssays;
        },
        synchronizeScroll(event) {
            for (let element of this.$el.querySelectorAll(".timeline-container")) {
                element.scrollLeft = event.target.scrollLeft;
            }
        },
        zoomIn() {
            this.zoom += 25;
        },
        zoomOut() {
            this.zoom -= 25;
        },
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