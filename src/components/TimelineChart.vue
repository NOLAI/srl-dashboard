<template>
    <div :style="{ width: zoom + '%' }">
        <apexchart ref="timeline" type="bar" height="150" :options="options" :series="mapSeries(series)"
            @dataPointMouseEnter="hoverHandler" @dataPointSelection="selectHandler"></apexchart>
    </div>
</template>

<script>
// base imports
import VueApexCharts from "vue3-apexcharts";

// import data
import { SET_EXPLANATION, SET_SELECTED_PROCESS, GET_SELECTED_PROCESS } from "../store/storeconstants";

export default {
    name: "TimelineChart",
    components: {
        apexchart: VueApexCharts,
    },
    props: ['series', 'zoom'],
    data: function () {
        const component = this;
        return {
            options: {
                chart: {
                    stacked: true,
                    toolbar: {
                        show: false
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        borderRadius: 10
                    }
                },
                xaxis: {
                    min: 0,
                    max: 45,
                    tickAmount: 9,
                    tickPlacement: 'on',
                    labels: {
                        show: true,
                    },
                    axisBorder: {
                        show: true
                    },
                    axisTicks: {
                        show: true,
                    },
                },
                yaxis: {
                    labels: {
                        show: false,
                        formatter: function (val) {
                            let minutes = Math.floor(val);
                            let seconds = Math.round((val - Math.floor(val)) * 60);
                            return (minutes >= 1 ? minutes + ' ' + component.$t(minutes > 1 ? "general.minutes" : "general.minute") : '') + (minutes > 0 && seconds > 0 ? ' ' + component.$t("general.and") + ' ' : '') + (seconds >= 1 ? seconds + ' ' + component.$t(seconds > 1 ? "general.seconds" : "general.second") : '');
                        },
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
                    },
                },
                tooltip: {
                    x: {
                        show: false,
                    },
                },
            },
        };
    },
    methods: {
        hoverHandler(e, chart, opts) {
            const selectedProcess = this.$store.getters[`explanation/${GET_SELECTED_PROCESS}`];
            if (selectedProcess == null) {
                this.$store.commit(`explanation/${SET_EXPLANATION}`, opts.w.config.series[opts.seriesIndex].id);
            }
        },
        selectHandler(e, chart, opts) {
            const selectedProcess = this.$store.getters[`explanation/${GET_SELECTED_PROCESS}`];
            const process = opts.w.config.series[opts.seriesIndex].id;

            if (opts.selectedDataPoints[opts.seriesIndex].includes(opts.dataPointIndex)) {
                chart.toggleDataPointSelection(opts.seriesIndex, opts.dataPointIndex);
                if (selectedProcess != process) {
                    this.$store.commit(`explanation/${SET_SELECTED_PROCESS}`, process);
                    this.$store.commit(`explanation/${SET_EXPLANATION}`, process);
                }
            } else {
                if (selectedProcess == process) {
                    this.$store.commit(`explanation/${SET_SELECTED_PROCESS}`, null);
                }
            }
        },
        mapSeries(series) {
            const selectedProcess = this.$store.getters[`explanation/${GET_SELECTED_PROCESS}`];
            return series.map((dataPoint) => {
                return {
                    id: dataPoint.name.replace(/\s+/g, ''),
                    name: this.$t("categories." + dataPoint.name.replace(/\s+/g, '')),
                    data: dataPoint.data,
                    color: selectedProcess != null && dataPoint.name != selectedProcess ? "#ebebeb" : dataPoint.color
                };
            });
        },
    },
    watch: {
        zoom: function () {
            this.$forceUpdate();
        },
    },
}

</script>