<template>
    <v-container fluid>
        <v-row v-if="!loading" class="w-full">
            <div :key="essay.course_id" v-for="essay in essay_responses" class="w-full mb-16" ref="timelines">
                <h1 class="text-xl font-bold mb-4">{{ $i18n.locale == 'nl' ? essay.name_nl : essay.name_en }}</h1>
                <h2 class="text-lg font-bold">{{ t('goals.process_goals') }}</h2>
                <div v-if="essay.response">
                    <div v-for="question in essay.response.questions" :key="question.id" class="mt-4">
                        <h2 class="text-md font-bold">{{ $i18n.locale == 'nl' ? question.content.nl :
                            question.content.en
                            }}</h2>
                        <div class="p-2 rounded border-l-4 border-black">
                            <div v-if="question.answer_type == 'bool'">
                                {{ question.answer_value ? t('general.yes') : t('general.no') }}
                            </div>
                            <div v-else-if="question.answer_type == 'text'">
                                {{ $i18n.locale == 'nl' ? question.answer_value.nl :
                                    question.answer_value.en }}
                            </div>
                            <div v-else-if="question.answer_type == 'single_choice'">
                                {{ $i18n.locale == 'nl' ? question.answer_value.nl :
                                    question.answer_value.en }}
                            </div>
                            <ul v-else-if="question.answer_type == 'multiple_choice'">
                                <li v-for="(choice, index) in question.answer_value" :key="index">
                                    {{ $i18n.locale == 'nl' ? choice.nl : choice.en }}
                                </li>
                            </ul>
                            <ol v-else-if="question.answer_type == 'rank'">
                                <li v-for="(choice, index) in question.answer_value" :key="index">
                                    <span class="font-bold">{{ choice.rank }}: </span>{{ $i18n.locale == 'nl' ?
                                        choice.choice.nl : choice.choice.en }}
                                </li>
                            </ol>
                            <div v-else>Not supported</div>
                        </div>
                    </div>
                </div>
                <div v-else class="p-4 background-gray-100 rounded border-l-4 border-red-400">
                    {{ t('goals.no_response') }}
                </div>
                <h2 class="text-lg font-bold mt-8">{{ t('goals.product_goals') }}</h2>
                <ProductGoals :course_id="essay.course_id" class="mt-4" />
            </div>
        </v-row>
        <v-progress-linear v-else indeterminate></v-progress-linear>
    </v-container>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { loadQuestions } from "@/logic/questions";
import { essays } from "@/logic/essay";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
import ProductGoals from "@/components/ProductGoals.vue";

const loading = ref(true);
const responses = ref([]);

onMounted(async () => {
    responses.value = await loadQuestions();
    loading.value = false;
});

const essay_responses = computed(() => {
    return essays.selected.map(essay => ({
        ...essay,
        response: responses.value.find(response => response.questionnaire_id == essay.questionnaire_id),
    }));
});
</script>
