<template>
    <v-row>
        <v-col class="text-left" cols="8">
            <h1 class="font-bold text-2xl">
                {{ auth.authenticated ? $t("general.dashboardTitle", { user: auth.user.username }) : $t("signin.title")
                }}
            </h1>
            <h2 class="text-lg italic">
                {{ $t("general.dashboardSubtitle") }}
            </h2>
        </v-col>
        <v-col v-if="auth.authenticated" cols="4" align="right">
            <LanguageSwitcher></LanguageSwitcher>
            <v-btn class="font-bold normal-case" type="submit" v-on:click.prevent="signout()">
                {{ $t("general.signout") }}
            </v-btn>
        </v-col>
        <v-col v-else cols="4" align="right">
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
