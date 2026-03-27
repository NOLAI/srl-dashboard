<template>
    <v-row class="explainer-heading">
        <h2 class="text-lg font-bold">
            {{ t('goals.subgoals') }}
        </h2>
        <hr class="border-t-2 mt-3 mb-4 w-full" />
        <ul v-if="!loading">
            <li class="mb-2" :key="subgoal.name" v-for="subgoal in goalsState.selected?.subgoals"
                @click="selectSubgoal(subgoal)">
                <v-icon :class="subgoal.completed ? 'text-lime-600' : 'text-red-600'" class="text-3xl"
                    :icon="subgoal.completed ? 'mdi-check' : 'mdi-close'"></v-icon>
                {{ Array.isArray(subgoal.name) ? t('goals.' + subgoal.name[0], subgoal.name[1]) : t('goals.' +
                    subgoal.name) }}
            </li>
        </ul>
        <v-progress-linear v-else indeterminate></v-progress-linear>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { goalsState, loadGoals } from "@/logic/goals";
import { useI18n } from 'vue-i18n'
import { track } from "@/logic/tracking";
const { t } = useI18n()

const props = defineProps({
    course_id: Number,
});

const loading = ref(true);
const goals = ref([]);

onMounted(async () => {
    goals.value = await loadGoals(props.course_id);
    loading.value = false;
});

const selectSubgoal = (subgoal) => {
    const events = goalsState.selected.events.filter(event => event.names.map(JSON.stringify).includes(JSON.stringify(subgoal.name)))
    if (JSON.stringify(goalsState.selectedEvents) != JSON.stringify(events)) {
        goalsState.selectedEvents = events;
        track('subgoal_selected', Array.isArray(subgoal.name) ? { subgoal: subgoal.name[0], subgoal_value: subgoal.name[1] } : { subgoal: subgoal.name });
    } else {
        goalsState.selectedEvents = [];
        track('subgoal_deselected', Array.isArray(subgoal.name) ? { subgoal: subgoal.name[0], subgoal_value: subgoal.name[1] } : { subgoal: subgoal.name });
    }
}
</script>
