<template>
    <div v-if="!loading" :style="{ width: zoom + '%' }">
        <Timeline class="mt-4" :groups="groups" :items="items.concat(events)" :viewportMin="0"
            :viewportMax="45 * 60 * 1000" @pointermove="hover" @click="select"
            :renderTimestampLabel="(timestamp, _) => timestamp / 60000">
            <template #item="{ item }">
                <div v-if="item.group == 'events'">
                    <v-tooltip :text="item.names.length ? item.names.join(', ') : ''" :disabled="!item.names.length"
                        location="bottom">
                        <template v-slot:activator="{ props }">
                            <v-icon v-bind="props" class="text-3xl w-full"
                                :class="!goalsState.selectedSubgoal || goalsState.selectedSubgoal.time == item.time ? 'text-lime-600' : 'text-process-disabled'"
                                icon="mdi-check" />
                        </template>
                    </v-tooltip>
                    <div class="highlight"
                        v-if="!goalsState.selectedSubgoal || goalsState.selectedSubgoal.time == item.time">
                    </div>
                </div>
                <v-tooltip v-else :text="item.name + ': ' + item.duration_text" location="top">
                    <template v-slot:activator="{ props }">
                        <div v-bind="props"
                            style="inset: 0; position: absolute; padding: .2em 1em; color: white; font-weight: bold;">
                        </div>
                    </template>
                </v-tooltip>
            </template>
        </Timeline>
    </div>
    <v-progress-linear v-else indeterminate></v-progress-linear>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { Timeline } from 'vue-timeline-chart';
import 'vue-timeline-chart/style.css';
import { loadProcesses, processState } from "@/logic/process";
import { goalsState } from "@/logic/goals";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    course_id: Number,
    combined: Boolean,
    zoom: Number,
});

const loading = ref(true);
const processes = ref([]);

const groups = computed(() => props.combined ? [{ id: 'timeline', className: 'timeline-group' }] : [
    { id: 'events' },
    { id: 'metacognition', label: t("process.metacognition"), className: 'timeline-group' },
    { id: 'cognition', label: t("process.cognition"), className: 'timeline-group' },
])

const items = computed(() => mapProcesses(processes.value, goalsState));
const events = computed(() => goalsState.selected || goalsState.hover ? mapGoalEvents(goalsState.selected?.events || goalsState.hover?.events) : []);

const mapProcesses = (processes, goalsState) => {
    const highlight_start = goalsState.selectedSubgoal ? Math.min(processes.filter(p => p.end_time < goalsState.selectedSubgoal.start).at(-3).end_time, goalsState.selectedSubgoal.start - 60000) : 0;
    const highlight_end = goalsState.selectedSubgoal ? Math.max(processes.filter(p => p.start_time > goalsState.selectedSubgoal.end).at(2).start_time, goalsState.selectedSubgoal.end + 60000) : 0;
    return processes.flatMap(p => {
        if (props.combined || p.type != "other") return p;
        return [
            { ...p, type: "cognition" },
            { ...p, type: "metacognition" },
        ];
    })
        .map(p => {
            const duration = p.end_time - p.start_time;
            const minutes = Math.floor(duration / 60000);
            const seconds = Math.round((duration / 1000) - (minutes * 60));
            const duration_text = (minutes >= 1 ? minutes + ' ' + t(minutes > 1 ? "general.minutes" : "general.minute") : '') + (minutes > 0 && seconds > 0 ? ' ' + t("general.and") + ' ' : '') + (seconds >= 1 ? seconds + ' ' + t(seconds > 1 ? "general.seconds" : "general.second") : '');

            let colour = p.colour;
            if (processState.selected && processState.selected != p.process) colour = "#EBEBEB";
            if (goalsState.selectedSubgoal && (p.end_time < highlight_start || p.start_time > highlight_end)) colour = "#EBEBEB";

            return {
                group: props.combined ? 'timeline' : p.type,
                type: 'range',
                process: p.process,
                name: t("process." + p.process),
                duration_text,
                start: p.start_time,
                end: p.end_time,
                className: 'timeline-item',
                cssVariables: { '--item-background': colour },
            };
        });
};

const mapGoalEvents = (events) => {
    return events.map((e) => {
        return {
            group: 'events',
            type: 'check',
            names: e.names.map((n) => Array.isArray(n) ? t('goals.' + n[0], n[1]) : t('goals.' + n)),
            time: e.time,
            start: e.time - 30000,
            end: e.time + 30000,
            className: 'timeline-event',
        };
    });
};

onMounted(async () => {
    processes.value = await loadProcesses(props.course_id);
    loading.value = false;
});

const hover = ({ item }) => {
    if (item == null) return;
    if (item.type == 'range') processState.lastHover = item.process;
}
const select = ({ item }) => {
    if (item == null) return;
    if (item.type == 'range') {
        processState.selected = processState.selected == item.process ? null : item.process;
        goalsState.selected = null;
        goalsState.selectedSubgoal = null;
    }
    if (item.type == 'check') {
        processState.selected = null;
        goalsState.selectedSubgoal = goalsState.selectedSubgoal?.time == item.time ? null : item;
    }
}

</script>
<style>
.timeline-group {
    border-top: 0 !important;
}

.timeline-group .group-label {
    font-weight: 600;
    font-size: 1em !important;
    padding: .8em !important;
}

.timeline-group .group-items {
    height: 5em !important;
}

.timeline-item {
    border-radius: 0 !important;
}

.timestamps {
    background-color: #FFFFFF00 !important;
}

.timeline-event {
    background-color: #FFFFFF00 !important;
    text-align: center;
    height: 20em !important;
}

.timeline-event .highlight {
    background-color: pink;
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>