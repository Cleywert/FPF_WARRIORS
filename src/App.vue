<template>
  <v-app>
    <v-main>
      <transition mode="out-in">
        <router-view />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
import login from "@/mixins/verify-login.js";
export default {
  name: "App",
  mixins: [login],
  created() {
    this.verificaLogin();
  }
};
</script>

<style>
.v-enter, .v-leave-to{
  opacity: 0;
  transform: translate3d(-50px, 0, 0);
}
.v-enter-active, .v-leave-active{
  transition: all .4s;
}
</style>