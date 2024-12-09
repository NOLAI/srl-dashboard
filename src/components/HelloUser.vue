<template>
    <v-row class="greetings" align="center">
        <v-col v-if="auth.authenticated" id="top-text" cols="8">
            <span class="title">
                {{ $t("general.dashboardTitle", { user: auth.user.username }) }}
            </span>
            <br>
            <span class="subsubtitle">
                {{ $t("general.dashboardSubtitle") }}
            </span>
        </v-col>
        <v-col v-if="auth.authenticated" cols="4" align="right">
            <LanguageSwitcher></LanguageSwitcher>
            <v-btn id="signout-button" type="submit" v-on:click.prevent="signout()">
                {{ $t("general.signout") }}
            </v-btn>
        </v-col>
        <v-col v-else cols="12" align="right">
            <LanguageSwitcher></LanguageSwitcher>
        </v-col>
    </v-row>
</template>

<script setup>
import { auth } from '@/logic/auth';
import LanguageSwitcher from "./LanguageSwitcher.vue";
import { useRouter } from 'vue-router';

const router = useRouter()

const signout = () => {
    auth.signout();
    router.push('/signin');
}
</script>

<style scoped>
#top-text {
    height: 10vh;
}

#top-text {
    text-align: left;
}

#signout-button {
    text-transform: capitalize;
    font-weight: 600;
}

#language-switcher {
    border-bottom: 2px solid white;
    padding-bottom: 5px;
    font-weight: normal;
    margin-right: 25px;
    text-align: center;
    background: transparent;
}
</style>
