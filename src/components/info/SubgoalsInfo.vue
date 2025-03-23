<template>
    <v-row class="explainer-heading">
        <span>
            {{ t('goals.subgoals') }}
        </span>
        <v-divider />
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
    const events = goalsState.selected.events.filter(event => event.names.includes(subgoal.name))
    goalsState.selectedEvents = events;
}
</script>

<style scoped>
.explainer-heading>span {
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

.dot {
    height: 2em;
    width: 2em;
    border-radius: 50%;
    display: inline-block;
}
</style>