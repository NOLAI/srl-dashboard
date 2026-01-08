<template>
    <v-container fluid>
        <v-row id="timelines" v-if="!loading">
            <div :key="response.id" v-for="response in responses">
                <h1 class="text-xl font-bold">{{ $i18n.locale == 'nl' ? response.questionnaire.name.nl :
                    response.questionnaire.name.en }}</h1>
                <div v-for="question in response.questions" :key="question.id" class="mb-8">
                    <h2 class="text-lg font-bold">{{ question.name }}:</h2>
                    <p>{{ $i18n.locale == 'nl' ? question.content.nl : question.content.en }}</p>
                    <div class="p-4 background-gray-100 rounded border-l-4 border-blue-400">
                        <strong>{{ t('general.answer') }}:</strong>
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
                <hr class="mt-8 mb-12" />
            </div>
        </v-row>
        <v-progress-linear v-else indeterminate></v-progress-linear>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loadQuestions } from "@/logic/questions";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();

const loading = ref(true);
const responses = ref([]);

onMounted(async () => {
    responses.value = await loadQuestions();
    console.log(responses.value);
    loading.value = false;
});
</script>

<style scoped>
#timelines {
    margin-bottom: 50px;
}
</style>