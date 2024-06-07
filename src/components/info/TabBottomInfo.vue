<template>
    <v-row class="explainer-row">
        <v-col cols="4" class="explainer-col px-8">
            <HoverInfo />
        </v-col>
        <template v-if="getSelectedEssays().length == 1">
            <v-col cols="4" class="explainer-col px-8">
                <FractionInfo :title="$t('categories.metacognition')" :m_perc="getSelectedEssays()[0].m_perc" />
            </v-col>
            <v-col cols="4" class="explainer-col px-8">
                <FractionInfo :title="$t('categories.cognition')" :c_perc="getSelectedEssays()[0].c_perc" />
            </v-col>
        </template>
        <template v-else-if="getSelectedEssays().length > 1">
            <v-col :cols="Math.floor(8 / getSelectedEssays().length)" class="explainer-col px-8" v-for="essay in getSelectedEssays()">
                <FractionInfo :title="$i18n.locale == 'nl' ? essay.name_nl : essay.name_en" :c_perc="essay.c_perc" :m_perc="essay.m_perc" />
            </v-col>
        </template>
    </v-row>
</template>

<script>
import HoverInfo from "./HoverInfo.vue";
import FractionInfo from "./FractionInfo.vue";
import { SET_AUTHENTICATION, SET_USERNAME } from "../../store/storeconstants";

export default {
    name: "TabBottomInfo",
    components: { FractionInfo, HoverInfo },
    methods: {
        logout() {
            this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
            this.$store.commit(`auth/${SET_USERNAME}`, "");
            this.output = "Logged out"
            this.$router.push('/login')
        },
        getSelectedEssays() {
            return this.$store.getters.selectedEssays;
        },
    }
}
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
.explainer-row {}

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