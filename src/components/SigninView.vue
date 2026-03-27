<template>
    <v-row class="px-16">
        <v-col cols="1"></v-col>
        <v-col cols="4">
            <div>
                <p class="mt-8">
                    {{ $t("signin.subtitle") }}
                </p>
                <p class="mt-4">
                    {{ $t("signin.subtitleText1") }}
                </p>
                <p class="mt-4">
                    {{ $t("signin.subtitleText2") }}
                </p>
                <p class="mt-4">
                    {{ $t("signin.subtitleText3") }}
                </p>
                <p class="mt-4">
                    {{ $t("signin.subtitleText4") }}
                </p>
                <p class="mt-4">
                    {{ $t("signin.subtitleText5") }}
                </p>
            </div>
        </v-col>
        <v-col class="bg-background_outer rounded-3xl p-16" cols="4" offset="2">
            <h2 class="font-bold mb-4">
                {{ $t("signin.signin") }}
            </h2>
            <form name="signin-form">
                <div class="mb-4 w-full">
                    <label for="username" class="font-bold uppercase text-sm">{{ $t("signin.username") }} </label><br>
                    <input type="text" id="username" class="w-full border-b-2 border-black border-solid"
                        v-model="username" />
                </div>
                <p class="text-red-500" v-if="error">{{ $t(error) }}</p>
                <div>
                    <v-btn class="font-bold normal-case" type="submit" v-on:click.prevent="signin()"
                        :disabled="loading">
                        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                        <span v-else>{{ $t("signin.signinButton") }}</span>
                    </v-btn>
                </div>
            </form>
        </v-col>
        <v-col cols="1"></v-col>
    </v-row>
</template>

<script setup>
import { ref } from 'vue';
import { auth } from '@/logic/auth';
import { useRouter } from 'vue-router';

const username = ref("");
const loading = ref(false);

const router = useRouter();

let error = ref("");

const signin = () => {
    if (username.value === "") {
        error.value = "signin.usernameEmptyError";
        return;
    }
    loading.value = true;
    auth.signin(username.value).then(() => {
        loading.value = false;
        router.push('/');
    }).catch((message) => {
        loading.value = false;
        error.value = 'signin.' + message;
    });
};
</script>