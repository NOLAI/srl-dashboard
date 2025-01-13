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
                        @click="select(goal)">
                        <span class="font-bold mr-4 w-32 inline-block pb-2">{{ t('goals.' + goal.name) }}</span>
                        <div class="opacity-75 hover:opacity-100 inline-block align-middle">
                            <span class="dot mr-2"
                                :style="`background-color: ${subgoal.completed ? goal.colour : '#EBEBEB'}; ${goalsState.selected && goalsState.selected != goal ? 'filter: contrast(30%) brightness(150%);' : ''}`"
                                :key="goal.name + '-' + subgoal.name"
                                v-for="subgoal in goal.subgoals.slice(0, 8)"></span>
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
                        v-for="subgoal in (goalsState.selected ? goalsState.selected.subgoals : (goalsState.lastHover ? goalsState.lastHover.subgoals : []))">
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
    goalsState.lastHover = goal;
}

const select = (goal) => {
    if (goalsState.selected == goal) {
        goalsState.selected = null;
    } else {
        goalsState.selected = goal;
    }
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