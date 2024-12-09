<template>
    <v-row class="signin-tab">
        <v-col cols="1"></v-col>
        <v-col cols="4">
            <div>
                <p class="title">
                    {{ $t("signin.title") }}
                </p>
            </div>
            <div>
                <p class="subsubtitle">
                    {{ $t("signin.subsubtitle") }}
                </p>
            </div>
            <div class="signin-info-box">
                <p class="subtitle">
                    {{ $t("signin.subtitle") }}
                </p>
                <p>
                    {{ $t("signin.subtitleText1") }}
                </p>
                <p>
                    {{ $t("signin.subtitleText2") }}
                </p>
                <p>
                    {{ $t("signin.subtitleText3") }}
                </p>
                <p>
                    {{ $t("signin.subtitleText4") }}
                </p>
                <p>
                    {{ $t("signin.subtitleText5") }}
                </p>
            </div>
        </v-col>
        <v-col class="signin-box" cols="4" offset="2">
            <p class="subtitle">
                {{ $t("signin.signin") }}
            </p>
            <form name="signin-form">
                <div class="mb-3 signin-input">
                    <label for="username">{{ $t("signin.username") }} </label><br>
                    <input type="text" id="username" class="w-100" v-model="username" />
                </div>
                <p class="error">{{ $t(error) }}</p>
                <div>
                    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="signin()"
                        :disabled="loading">
                        <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                        <span v-else>{{ $t("signin.signinButton") }}</span>
                    </button>
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

<style scoped>
.greetings {
    display: none !important;
}

#loading {
    margin-top: -10px;
    margin-bottom: -10px;
}

.signin-tab {
    padding: 4em 0em;
}

.signin-info-box .subtitle {
    margin-top: 2em;
}

.signin-info-box p:not(.subtitle) {
    margin-top: 15px;
}

.signin-box {
    background: #EBEBEB;
    border-radius: 25px;
    padding: 4em;
}

.signin-box label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
}

.signin-box input {
    border-bottom: 2px solid #2c3e50;
    margin-top: 10px;
    width: 50%;
}

.signin-input {
    margin-top: 20px;
}

.signin-box button {
    color: white;
    background-color: #2c3e50;
    padding: 10px 40px;
    border-radius: 25px;
    margin-top: 30px;
    width: 50%;
}
</style>