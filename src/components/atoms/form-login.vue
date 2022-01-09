<template>
  <div>
    <v-alert
      v-model="showAlert"
      :type="typeAlert"
      class="mt-2 mb-0"
      transition="slide-y-transition"
      outlined
      dismissible
    >
      {{ message }}
    </v-alert>

    <v-card-title class="pl-0">Login</v-card-title>
    <v-form @submit="login">
      <v-text-field v-model="name" label="User Name" outlined></v-text-field>
      <v-text-field
        v-model="senha"
        label="Senha"
        type="password"
        outlined
      ></v-text-field>

      <v-btn block color="success" type="submit">LOGIN</v-btn>
      <p class="my-2 text-center text-caption">ou</p>
      <v-btn block small color="plaing" @click="changeForLogin">
        CADASTRE-SE
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data: () => ({
    name: "",
    senha: "",
    showAlert: false,
    typeAlert: "error",
    message: "",
  }),
  methods: {
    ...mapActions(["start_session"]),
    login(event) {
      event.preventDefault();
      if (this.name !== "" && this.senha !== "") {
        axios
          .get(`${this.urlBase}/user/${this.name}/${this.senha}`)
          .then((response) => {
            if (typeof response.data.message === "undefined") {
              this.start_session(response.data);
              this.$router.push({path: "/game/start"})
            } else {
              this.message = response.data.message;
              this.typeAlert = "error";
              this.showAlert = true;
            }
          });
      } else {
        this.message = "Preencha todos os campos";
        this.typeAlert = "warning";
        this.showAlert = true;
      }
    },
    changeForLogin() {
      this.$emit("change-form");
    },
  },
};
</script>

<style>
</style>