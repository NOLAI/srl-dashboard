<template>
    <div v-if="!loading">
        <div class="w-full grid gap-4 grid-cols-4">
            <div :key="goal.name" v-for="goal in goals">
                <h3 class="font-bold block mb-2">{{ t('goals.' + goal.name) }}</h3>
                <ul>
                    <li class="mb-2" :key="subgoal.name" v-for="subgoal in goal.subgoals">
                        <v-icon :class="subgoal.completed ? 'text-lime-600' : 'text-red-600'" class="text-3xl"
                            :icon="subgoal.completed ? 'mdi-check' : 'mdi-close'"></v-icon>
                        {{ Array.isArray(subgoal.name) ? t('goals.' + subgoal.name[0], subgoal.name[1]) : t('goals.' +
                            subgoal.name) }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <v-progress-linear v-else indeterminate></v-progress-linear>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadGoals } from "@/logic/goals";
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
    course_id: Number,
    title: String,
});

const loading = ref(true);
const goals = ref([]);

onMounted(async () => {
    goals.value = await loadGoals(props.course_id);
    console.log(goals.value);
    loading.value = false;
});
</script>