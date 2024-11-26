<template>
    <v-row class="explainer-heading">
        <span>
            {{ props.title }}
        </span>
        <v-divider />
        <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.metacognition') }}</strong>
        <template v-if="!props.type || props.type == 'metacognition'">
            <p class="explainer-perc" @mouseover="hover(item.process)" @click="select(item.process)"
                v-for="item in percentages.metacognition" :key="item.process">
                <span class="dot"
                    :style="'background-color: ' + (process.selected == null || process.selected == item.process ? item.colour : '#bbb')"></span>
                <span class="explainer-perc-number">
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
                    :style="'background-color: ' + (process.selected == null || process.selected == item.process ? item.colour : '#bbb')"></span>
                <span class="explainer-perc-number">
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
import { process, loadProcesses } from "@/logic/process";

const props = defineProps({
    title: String,
    type: String,
    course_id: Number,
});

const loading = ref(true);
const processes = ref([]);

const percentages = computed(() => computePercentages(processes.value));

const computePercentages = (processes) => {
    const percentages = { total: 0, metacognition: {}, cognition: {} };
    processes.forEach((p) => {
        percentages.total += p.end_time - p.start_time;
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
    process.last_hover = id;
};

const select = (id) => {
    process.selected = process.selected == id ? null : id;
};
</script>