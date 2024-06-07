<template>
    <v-row class="explainer-heading">
        <span v-if="getExplanation()">
            {{ $t("categories." + getExplanation()) }}
        </span>
        <span v-else>
            {{ $t("explanations.title") }}
        </span>
        <v-divider />
        <p v-if="getExplanation()">
            {{ $t("explanations." + getExplanation()) }}
        </p>
        <p v-else>
            {{ $t("explanations.NietGedetecteerd") }}
        </p>
    </v-row>
</template>

<script>
import { GET_EXPLANATION } from "../../store/storeconstants";

export default {
    name: "HoverInfo",
    methods: {
        getExplanation() {
            return this.$store.getters[`explanation/${GET_EXPLANATION}`]
        },
    }
}
</script>

<style scoped></style>