<template>
    <v-row>
        <span class="explainer-heading">
            {{ props.type ? $t("process." + props.type) : props.title }}
        </span>
        <v-divider />
        <div v-if="!loading" class="flex flex-wrap">
            <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.metacognition') }}</strong>
            <template v-if="!props.type || props.type == 'metacognition'">
                <p class="explainer-perc" @mouseover="hover(process)" @click="select(process)"
                    v-for="(time, process) in percentages.metacognition" :key="process">
                    <span class="dot"
                        :class="'bg-process-' + (processState.selected == null || processState.selected == process ? process : 'disabled')"></span>
                    <span class="explainer-perc-number" v-if="props.show_percentage">
                        {{ Math.round(time / percentages.total * 100).toFixed(0) }}%
                    </span>
                    <span class="explainer-perc-text">
                        {{ $t("process." + process) }}
                    </span>
                </p>
            </template>
            <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.cognition') }}</strong>
            <template v-if="!props.type || props.type == 'cognition'">
                <p class="explainer-perc" @mouseover="hover(process)" @click="select(process)"
                    v-for="time, process in percentages.cognition" :key="process">
                    <span class="dot"
                        :class="'bg-process-' + (processState.selected == null || processState.selected == process ? process : 'disabled')"></span>
                    <span class="explainer-perc-number" v-if="props.show_percentage">
                        {{ Math.round(time / percentages.total * 100).toFixed(0) }}%
                    </span>
                    <span class="explainer-perc-text">
                        {{ $t("process." + process) }}
                    </span>
                </p>
            </template>
        </div>
        <v-progress-linear v-else indeterminate></v-progress-linear>
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
    const percentages = {
        total: 0,
        metacognition: {
            orientation: 0,
            planning: 0,
            evaluation: 0,
            monitoring: 0,
        },
        cognition: {
            reading: 0,
            rereading: 0,
            writing: 0,
            organising: 0,
            copying: 0,
            editing: 0,
            structuring: 0,
            expanding: 0,
        }
    };
    processes.forEach((p) => {
        if (!(p.type in percentages) || !(p.process in percentages[p.type])) return;
        percentages.total += p.end_time - p.start_time;
        percentages[p.type][p.process] += p.end_time - p.start_time;
    });
    if (percentages.cognition.writing > 0) {
        delete percentages.cognition.copying;
        delete percentages.cognition.editing;
        delete percentages.cognition.structuring;
        delete percentages.cognition.expanding;
    } else {
        delete percentages.cognition.writing;
    }
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
.explainer-heading {
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

.explainer-perc {
    display: inline;
    width: 100%;
    margin-bottom: 20px;
}

.explainer-perc-number {
    display: inline-block;
    width: 40px;
}

.explainer-perc-text {
    font-style: italic;
}

.dot {
    height: .9em;
    width: .9em;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    opacity: 0.75;
}
</style>