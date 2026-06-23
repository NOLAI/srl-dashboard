<template>
    <v-select v-if="!loading" v-model="selectedEssays.selected" :items="essays" :item-title="'name_' + $i18n.locale"
        :label="$t('general.selectEssays')" return-object multiple
        @update:model-value="val => track('essays_selected', { essays: val })"></v-select>
    <v-progress-linear v-else indeterminate></v-progress-linear>
</template>

<script setup>
import { loadEssays, essays as selectedEssays } from '@/logic/essay';
import { onMounted, ref } from 'vue';
import { track } from '@/logic/tracking';

let loading = ref(true);
let essays = ref([]);

onMounted(async () => {
    essays.value = await loadEssays();
    selectedEssays.selected = essays.value.length ? [essays.value[essays.value.length - 1]] : [];
    track('essays_selected', { essays: selectedEssays.selected });
    loading.value = false;
});
</script>
