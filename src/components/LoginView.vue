<template>
    <v-row class="login-tab">
        <v-col cols="1"></v-col>
        <v-col cols="4">
            <div>
                <p class="title">
                    {{ $t("login.title") }}
                </p>
            </div>
            <div>
                <p class="subsubtitle">
                    {{ $t("login.subsubtitle") }}
                </p>
            </div>
            <div class="login-info-box">
                <p class="subtitle">
                    {{ $t("login.subtitle") }}
                </p>
                <p>
                    {{ $t("login.subtitleText1") }}
                </p>
                <p>
                    {{ $t("login.subtitleText2") }}
                </p>
                <p>
                    {{ $t("login.subtitleText3") }}
                </p>
                <p>
                    {{ $t("login.subtitleText4") }}
                </p>
                <p>
                    {{ $t("login.subtitleText5") }}
                </p>
            </div>
        </v-col>
        <v-col cols="2"></v-col>
        <v-col class="login-box" cols="4" offset="2">
            <p class="subtitle">
                {{ $t("login.login") }}
            </p>
            <form name="login-form">
                <div class="mb-3 login-input">
                    <label for="username">{{ $t("login.username") }} </label><br>
                    <input type="text" id="username" class="w-100" v-model="username" />
                </div>
                <p class="error">{{ this.output }}</p>
                <div>
                    <button class="btn btn-outline-dark" type="submit" v-on:click.prevent="login()">
                        <img id="loading" v-if="isLoading()" src="/loading.gif" height="42">
                        <span v-else>{{ $t("login.loginButton") }}</span>
                    </button>
                </div>
            </form>
        </v-col>
        <v-col cols="1"></v-col>
    </v-row>
</template>

<script>
import { GET_USERNAME, IS_LOADING, SET_LOADING, SET_AUTHENTICATION, SET_USERNAME } from "../store/storeconstants";

export default {
    name: 'LoginView',
    data() {
        return {
            username: "",
            output: "",
        }
    },
    methods: {
        login() {
            //make sure username OR password are not empty
            this.$store.commit(`auth/${SET_LOADING}`, true);
            if (this.username !== "") {
                this.$store.commit(`auth/${SET_USERNAME}`, this.username);
                this.fetchData();
            } else {
                this.output = this.$t("login.usernameEmptyError")
                this.$store.commit(`auth/${SET_LOADING}`, false);
            }
        },
        fetchData() {
            this.$store.dispatch('loadTraceData', { username: this.$store.getters[`auth/${GET_USERNAME}`] }, {
                root: true
            }).then((res) => {
                this.$store.commit(`auth/${SET_LOADING}`, false);
                this.$store.commit(`auth/${SET_AUTHENTICATION}`, true);
                this.$router.push('/');
            })
                .catch((res) => {
                    if(res.status === 404){
                        this.output = this.$t("login.incorrectUsernameError");
                    }
                    else{
                        this.output = this.$t("login.generalError");
                    }
                    this.$store.commit(`auth/${SET_LOADING}`, false);
                })
        },
        isLoading() {
            return this.$store.getters[`auth/${IS_LOADING}`]
        },
    },
}
</script>

<style scoped>
.greetings {
    display: none !important;
}

#loading {
    margin-top: -10px;
    margin-bottom: -10px;
}

.login-tab {
    padding: 4em 0em;
}

.login-info-box .subtitle {
    margin-top: 2em;
}

.login-info-box p:not(.subtitle) {
    margin-top: 15px;
}

.login-box {
    background: #EBEBEB;
    border-radius: 25px;
    padding: 4em;
}

.login-box label {
    text-transform: uppercase;
    font-weight: bold;
    font-size: 12px;
}

.login-box input {
    border-bottom: 2px solid #2c3e50;
    margin-top: 10px;
    width: 50%;
}

.login-input {
    margin-top: 20px;
}

.login-box button {
    color: white;
    background-color: #2c3e50;
    padding: 10px 40px;
    border-radius: 25px;
    margin-top: 30px;
    width: 50%;
}
</style>