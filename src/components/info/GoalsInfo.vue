<template>
    <v-row>
        <v-col cols="7" class="px-8">
            <v-row class="explainer-heading">
                <span>
                    {{ t('goals.goals') }}
                </span>
                <v-divider />
                <div v-if="!loading">
                    <div class="mb-4" :key="goal.name" v-for="goal in goals" @mouseover="hover(goal)"
                        @mouseout="hover(null)" @click="select(goal)">
                        <span class="font-bold mr-4 w-32 inline-block pb-2">{{ t('goals.' + goal.name) }}</span>
                        <div class="inline-block align-middle hover:!opacity-100"
                            :class="goalsState.selected == goal ? 'opacity-100' : 'opacity-75'">
                            <span class="dot mr-2" :class="'bg-goals-' + (subgoal.completed ? goal.name : 'disabled')"
                                :key="goal.name + '-' + subgoal.name"
                                v-for="subgoal in goal.subgoals.toSorted(g => !g.completed).slice(0, 12)"></span>
                        </div>
                    </div>
                </div>
                <v-progress-linear v-else indeterminate></v-progress-linear>
            </v-row>
        </v-col>
        <v-col cols="5" class="px-8">
            <v-row class="explainer-heading">
                <span>
                    {{ t('goals.subgoals') }}
                </span>
                <v-divider />
                <ul v-if="!loading">
                    <li class="mb-2" :key="subgoal.name"
                        v-for="subgoal in (goalsState.selected?.subgoals || goalsState.hover?.subgoals)">
                        <v-icon :class="subgoal.completed ? 'text-lime-600' : 'text-red-600'" class="text-3xl"
                            :icon="subgoal.completed ? 'mdi-check' : 'mdi-close'"></v-icon>
                        {{ Array.isArray(subgoal.name) ? t('goals.' + subgoal.name[0], subgoal.name[1]) : t('goals.' +
                            subgoal.name) }}
                    </li>
                </ul>
                <v-progress-linear v-else indeterminate></v-progress-linear>
            </v-row>
        </v-col>
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

const hover = (goal) => {
    goalsState.hover = goal;
}

const select = (goal) => {
    goalsState.selectedSubgoal = null;
    goalsState.selected = goalsState.selected != goal ? goal : null;
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