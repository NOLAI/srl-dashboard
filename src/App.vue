<template>
    <v-container fluid>
        <v-container fluid>
            <HelloUser />
        </v-container>
        <v-container fluid class="bg-white rounded-3xl p-10">
            <RouterView />
        </v-container>
    </v-container>
</template>

<script setup>
import HelloUser from "./components/HelloUser.vue";
</script>