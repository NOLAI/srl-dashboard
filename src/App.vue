<template>
    <v-container fluid id="app">
        <v-container fluid id="outer">
            <HelloUser />
        </v-container>
        <v-container fluid id="inner">
            <RouterView />
        </v-container>
    </v-container>
</template>

<script>
import HelloUser from "./components/HelloUser.vue";

export default {
    name: 'App',
    components: {
        HelloUser
    },
}
</script>

<style>
#inner {
    background-color: #ffffff;
    min-height: 80vh;
    height: 100%;
    border-radius: 25px;
    box-sizing: border-box;
    padding: 40px 40px 40px 40px;
    text-align: left;
}
</style>