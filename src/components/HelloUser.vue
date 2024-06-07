<template>
  <v-row class="greetings" align="center">
      <v-col v-if="isAuthenticated()" id="top-text" cols="8">
          <span class="title">
              {{ $t("general.dashboardTitle", { user: getUsername() }) }}
          </span>
          <br>
          <span class="subsubtitle">
              {{ $t("general.dashboardSubtitle") }}
          </span>
      </v-col>
      <v-col v-if="isAuthenticated()" cols="4" align="right">
          <LanguageSwitcher></LanguageSwitcher>
          <v-btn id="logout-button"
                 v-if="isAuthenticated()"
                 type="submit"
                 v-on:click.prevent="logout()">
              {{ $t("general.logout") }}
          </v-btn>
      </v-col>
      <v-col v-else-if="!isAuthenticated()" cols="12" align="right">
          <LanguageSwitcher></LanguageSwitcher>
      </v-col>
  </v-row>
</template>
<script>
import {GET_USERNAME, IS_USER_AUTHENTICATED, SET_AUTHENTICATION, SET_USERNAME} from "../store/storeconstants";
import {useI18n} from "vue-i18n";
import Tr from "@/i18n/translation"
import LanguageSwitcher from "./LanguageSwitcher.vue";

export default {
    name: "HelloUser",
    components: {LanguageSwitcher},
    setup() {
        const { t, locale } = useI18n()
        const supportedLocales = Tr.supportedLocales
        const switchLanguage = async (event) => {
            const newLocale = event.target.value
            await Tr.switchLanguage(newLocale)
        }
        return { t, locale, supportedLocales, switchLanguage }
    },
    methods:{
        getUsername() {
            return this.$store.getters[`auth/${GET_USERNAME}`]
        },
        logout() {
            // this.$store.commit(`auth/${SET_AUTHENTICATION}`, false);
            // this.$store.commit(`auth/${SET_USERNAME}`, "");

            // this.output = "Logged out"
            // this.$router.push('/login')

            // Very temporary logout store fix:
            // TODO: Implement proper logout
            localStorage.clear();
            window.location.reload();
        },
        isAuthenticated() {
            return this.$store.getters[`auth/${IS_USER_AUTHENTICATED}`]
        },
    }
};
</script>
<style scoped>
#top-text{
    height: 10vh;
}
#top-text{
    text-align: left;
}
#logout-button{
    text-transform: capitalize;
    font-weight: 600;
}
#language-switcher{
    border-bottom:2px solid white;
    padding-bottom: 5px;
    font-weight: normal;
    margin-right: 25px;
    text-align: center;
    background: transparent;
}
</style>
