<template>
    <div v-if="!loading" :style="{ width: zoom + '%' }">
        <VueApexCharts ref="timeline" type="rangeBar" :height="props.combined ? 150 : 250" :options="options"
            :series="series ?? []" @dataPointMouseEnter="hover" @click="select" />
    </div>
    <v-progress-linear v-else indeterminate></v-progress-linear>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { loadProcesses, process } from "@/logic/process";
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
    course_id: Number,
    combined: Boolean,
    zoom: Number,
});

const loading = ref(true);
const processes = ref([]);

const series = computed(() => mapProcesses(processes.value));

const mapProcesses = (processes) => {
    return processes.map((p) => {
        return {
            id: p.process,
            name: t("process." + p.process),
            data: [
                {
                    x: props.combined ? 'combined' : t("process." + p.type),
                    y: [p.start_time / 60000, p.end_time / 60000],
                }
            ],
            color: !process.selected || process.selected == p.process ? p.colour : "#EBEBEB",
        };
    });
};

onMounted(async () => {
    processes.value = await loadProcesses(props.course_id);
    loading.value = false;
});

const hover = (_, __, opts) => {
    process.last_hover = opts.w.config.series[opts.seriesIndex].id;
}
const select = (_, __, opts) => {
    if (opts.seriesIndex == -1) return;
    const id = opts.config.series[opts.seriesIndex].id;
    process.selected = process.selected == id ? null : id;
}

const options = {
    chart: {
        type: 'rangeBar',
        toolbar: {
            show: false
        },
        animations: {
            enabled: false,
        },
    },
    plotOptions: {
        bar: {
            horizontal: true,
            rangeBarGroupRows: true,
        }
    },
    yaxis: {
        min: 0,
        max: 45,
        tickAmount: 9,
        labels: {
            show: !props.combined,
        },
    },
    grid: {
        show: false
    },
    legend: {
        show: false,
    },
    dataLabels: {
        enabled: false,
    },
    states: {
        active: {
            allowMultipleDataPointsSelection: false,
            filter: {
                type: 'none',
                value: 0
            }
        },
    },
    tooltip: {
        x: {
            show: false,
        },
        custom: function (opts) {
            const w = opts.ctx.w
            const process = w.config.series[opts.seriesIndex].name
            const colour = w.globals.colors[opts.seriesIndex]
            const time = w.config.series[opts.seriesIndex].data[0].y

            const duration = time[1] - time[0];
            const minutes = Math.floor(duration);
            const seconds = Math.round((duration - Math.floor(duration)) * 60);
            const duration_text = (minutes >= 1 ? minutes + ' ' + t(minutes > 1 ? "general.minutes" : "general.minute") : '') + (minutes > 0 && seconds > 0 ? ' ' + t("general.and") + ' ' : '') + (seconds >= 1 ? seconds + ' ' + t(seconds > 1 ? "general.seconds" : "general.second") : '');

            return (
                '<div class="apexcharts-tooltip-rangebar">' +
                '<div> <span class="series-name" style="color: ' +
                colour +
                '">' +
                process +
                '</span></div>' +
                '<div> <span class="value">' +
                duration_text +
                '</span></div>' +
                '</div>'
            )
        },
    },
};

</script>