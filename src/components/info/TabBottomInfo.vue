<template>
    <v-row class="explainer-row">
        <v-col cols="4" class="explainer-col px-8">
            <HoverInfo />
        </v-col>
        <template v-if="essays.selected.length == 1">
            <v-col cols="4" class="explainer-col px-8">
                <FractionInfo :title="$t('process.metacognition')" type="metacognition"
                    :course_id="essays.selected[0].course_id" />
            </v-col>
            <v-col cols="4" class="explainer-col px-8">
                <FractionInfo :title="$t('process.cognition')" type="cognition"
                    :course_id="essays.selected[0].course_id" />
            </v-col>
        </template>
        <template v-else-if="essays.selected.length > 1">
            <v-col :key="essay.course_id" :cols="Math.floor(8 / essays.selected.length)" class="explainer-col px-8"
                v-for="essay in essays.selected">
                <FractionInfo :title="$i18n.locale == 'nl' ? essay.name_nl : essay.name_en"
                    :course_id="essay.course_id" />
            </v-col>
        </template>
    </v-row>
</template>

<script setup>
import HoverInfo from "./HoverInfo.vue";
import FractionInfo from "./FractionInfo.vue";
import { essays } from '@/logic/essay';

</script>

<style>
.explainer-heading>span {
    font-weight: 600;
    font-size: 13pt;
    text-align: left;
}

/*.explainer-heading span:not(:first-child){*/
/*    margin-bottom: 10px;*/
/*}*/
.explainer-row {
    min-height: 200px;
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
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
}
</style>