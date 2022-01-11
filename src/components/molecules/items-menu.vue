<template>
  <div class="d-flex align-center">
    <v-list-item link to="/regras">REGRAS</v-list-item>
    <v-list-item link to="/game/start">JOGAR</v-list-item>
    <BtnLogin v-if="!user"></BtnLogin>
    <v-btn v-else text color="error" @click="logoff">SAIR</v-btn>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import BtnLogin from "@/components/atoms/btn-login.vue";
export default {
  components: { BtnLogin },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    logoff() {
      window.localStorage.removeItem("userLog")
      this.SET_USER(null)
      this.$router.push({path: '/'})
    }
  }
};
</script>