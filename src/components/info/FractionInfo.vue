<template>
    <v-row class="explainer-heading">
        <span>
            {{ props.type ? $t("process." + props.type) : props.title }}
        </span>
        <v-divider />
        <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.metacognition') }}</strong>
        <template v-if="!props.type || props.type == 'metacognition'">
            <p class="explainer-perc" @mouseover="hover(item.process)" @click="select(item.process)"
                v-for="item in percentages.metacognition" :key="item.process">
                <span class="dot"
                    :style="'background-color: ' + (processState.selected == null || processState.selected == item.process ? item.colour : '#bbb')"></span>
                <span class="explainer-perc-number" v-if="props.show_percentage">
                    {{ Math.round(item.value / percentages.total * 100).toFixed(0) }}%
                </span>
                <span class="explainer-perc-text">
                    {{ $t("process." + item.process) }}
                </span>
            </p>
        </template>
        <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.cognition') }}</strong>
        <template v-if="!props.type || props.type == 'cognition'">
            <p class="explainer-perc" @mouseover="hover(item.process)" @click="select(item.process)"
                v-for="item in percentages.cognition" :key="item.process">
                <span class="dot"
                    :style="'background-color: ' + (processState.selected == null || processState.selected == item.process ? item.colour : '#bbb')"></span>
                <span class="explainer-perc-number" v-if="props.show_percentage">
                    {{ Math.round(item.value / percentages.total * 100).toFixed(0) }}%
                </span>
                <span class="explainer-perc-text">
                    {{ $t("process." + item.process) }}
                </span>
            </p>
        </template>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { processState, loadProcesses } from "@/logic/process";

const props = defineProps({
    title: String,
    type: String,
    course_id: Number,
    show_percentage: Boolean,
});

const loading = ref(true);
const processes = ref([]);

const percentages = computed(() => computePercentages(processes.value));

const computePercentages = (processes) => {
    const percentages = { total: 0, metacognition: {}, cognition: {} };
    processes.forEach((p) => {
        percentages.total += p.end_time - p.start_time;
        if (!percentages[p.type]) percentages[p.type] = {};
        if (!percentages[p.type][p.process]) {
            percentages[p.type][p.process] = {
                process: p.process,
                type: p.type,
                colour: p.colour,
                value: p.end_time - p.start_time,
            };
            return;
        }
        percentages[p.type][p.process].value += p.end_time - p.start_time;
    });
    return percentages;
};

onMounted(async () => {
    processes.value = await loadProcesses(props.course_id);
    loading.value = false;
});

const hover = (id) => {
    processState.lastHover = id;
};

const select = (id) => {
    processState.selected = processState.selected == id ? null : id;
};
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

.dot {
    height: .9em;
    width: .9em;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    opacity: 0.7;
}
</style>