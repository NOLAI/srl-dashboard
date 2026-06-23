<template>
    <v-row>
        <h2 class="text-lg font-bold">
            {{ props.type ? $t("process." + props.type) : props.title }}
        </h2>
        <hr class="border-t-2 mt-3 mb-4 w-full" />
        <div v-if="!loading" class="flex flex-wrap">
            <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.metacognition') }}</strong>
            <template v-if="!props.type || props.type == 'metacognition'">
                <div class="w-full mb-4" @mouseover="hover(process)" @click="select(process)"
                    v-for="(time, process) in percentages.metacognition" :key="process">
                    <span class="w-4 h-4 rounded-full inline-block mr-2 opacity-75"
                        :class="'bg-process-' + (processState.selected == null || processState.selected == process ? process : 'disabled')"></span>
                    <span class="inline-block w-8" v-if="props.show_percentage">
                        {{ Math.round(time / percentages.total * 100).toFixed(0) }}%
                    </span>
                    <span class="text-md italic">
                        {{ $t("process." + process) }}
                    </span>
                </div>
            </template>
            <strong v-if="!props.type" style="margin-bottom: 10px">{{ $t('process.cognition') }}</strong>
            <template v-if="!props.type || props.type == 'cognition'">
                <div class="w-full mb-4" @mouseover="hover(process)" @click="select(process)"
                    v-for="time, process in percentages.cognition" :key="process">
                    <span class="w-4 h-4 rounded-full inline-block mr-2 opacity-75"
                        :class="'bg-process-' + (processState.selected == null || processState.selected == process ? process : 'disabled')"></span>
                    <span class="inline-block w-8" v-if="props.show_percentage">
                        {{ Math.round(time / percentages.total * 100).toFixed(0) }}%
                    </span>
                    <span class="text-md italic">
                        {{ $t("process." + process) }}
                    </span>
                </div>
            </template>
        </div>
        <v-progress-linear v-else indeterminate></v-progress-linear>
    </v-row>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { processState, loadProcesses } from "@/logic/process";
import { track } from "@/logic/tracking";

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
    if (processState.selected == id) {
        processState.selected = null;
        track('process_type_deselected', { process: id });
    } else {
        processState.selected = id;
        track('process_type_selected', { process: id });
    }
};
</script>
