<template>
    <v-select v-model="selectedEssays" :items="essays" :item-title="'name_'+$i18n.locale" :label="$t('general.selectEssays')" return-object
        multiple></v-select>
</template>

<script>
export default {
    name: "EssaySelector",
    data: function () {
        return {
            essays: this.$store.getters.essays,
        };
    },
    computed: {
        selectedEssays: {
            get() {
                return this.$store.getters.selectedEssays
            },
            set(value) {
                this.$store.commit('SET_SELECTED_ESSAYS', value)
            }
        }
    },
}
</script>