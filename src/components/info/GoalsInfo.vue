<template>
    <v-row class="explainer-heading">
        <h2 class="text-lg font-bold">
            {{ props.title ?? t('goals.goals') }}
        </h2>
        <hr class="border-t-2 mt-3 mb-4 w-full" />
        <div v-if="!loading">
            <div class="mb-4" :key="goal.name" v-for="goal in goals" @click="select(goal)">
                <span class="font-bold block mb-2">{{ t('goals.' + goal.name) }}</span>
                <div class="align-middle hover:!opacity-100"
                    :class="goalsState.selected == goal ? 'opacity-100' : 'opacity-75'">
                    <span class="w-6 h-6 rounded-full inline-block mr-2"
                        :class="'bg-goals-' + (subgoal.completed ? goal.name : 'disabled')"
                        :key="goal.name + '-' + subgoal.name"
                        v-for="subgoal in goal.subgoals.toSorted(g => !g.completed).slice(0, 12)"></span>
                </div>
            </div>
        </div>
        <v-progress-linear v-else indeterminate></v-progress-linear>
    </v-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { goalsState, loadGoals } from "@/logic/goals";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
import { track } from "@/logic/tracking";

const props = defineProps({
    course_id: Number,
    title: String,
});

const loading = ref(true);
const goals = ref([]);

onMounted(async () => {
    goals.value = await loadGoals(props.course_id);
    loading.value = false;
});

const select = (goal) => {
    goalsState.selectedEvents = [];
    if (goalsState.selected != goal) {
        goalsState.selected = goal;
        track('goal_selected', { goal: goal.name });
    } else {
        goalsState.selected = null;
        track('goal_deselected', { goal: goal.name });
    }
}
</script>