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

    <v-overlay :absolute="true" :value="loading">
      <v-progress-circular indeterminate color="plaing"></v-progress-circular>
    </v-overlay>


    <v-card-title class="pl-0">Cadastre-se</v-card-title>
    <v-form @submit="cadastrar">
      <v-row dense>
        <v-col sm="12">
          <v-text-field
            v-model="name"
            label="User Name"
            counter="15"
            maxlength="15"
            outlined
          ></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field
            v-model="senha"
            label="Senha"
            type="password"
            outlined
          ></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field
            v-model="senhaConfirm"
            label="Confirmar Senha"
            type="password"
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn block color="success" type="submit">CADASTRAR</v-btn>
      <p class="my-2 text-center text-caption">ou</p>
      <v-btn block small color="plaing" @click="changeForLogin"
        >FAÇA SEU LOGIN</v-btn
      >
    </v-form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    name: "",
    senha: "",
    senhaConfirm: "",
    showAlert: false,
    typeAlert: "success",
    message: "",
    loading: false
  }),
  methods: {
    changeForLogin() {
      this.$emit("change-form");
    },
    cadastrar(event) {
      event.preventDefault();
      if (this.senha != "" && this.name != "") {
        if (this.senha === this.senhaConfirm) {
          this.loading = true

          axios
            .post(`${this.urlBase}/user`, {
              name: this.name,
              senha: this.senha,
            })
            .then(() => {
              this.loading = false
              this.message = "Cadastro realizado com sucesso";
              this.typeAlert = "success";
              this.showAlert = true;
            })
            .catch(() => {
              this.loading = false
              this.message = "Este user name já está em uso!";
              this.typeAlert = "error";
              this.showAlert = true;
            });
        } else {
          this.message = "As senhas informadas não são compatíveis";
          this.typeAlert = "warning";
          this.showAlert = true;
        }
      } else {
        this.message = "Preencha todos os campos";
        this.typeAlert = "warning";
        this.showAlert = true;
      }
    },
  },
};
</script>

<style>
</style>