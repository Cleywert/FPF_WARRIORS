<template>
  <div>
    <v-card-title class="pl-0">Cadastre-se</v-card-title>
    <v-form @submit="cadastrar">
      <v-row dense>
        <v-col sm="12">
          <v-text-field v-model="name" label="User Name" counter="15" maxlength="15" outlined></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field v-model="senha" label="Senha" type="password" outlined></v-text-field>
        </v-col>
        <v-col sm="6">
          <v-text-field v-model="senhaConfirm" label="Confirmar Senha" type="password" outlined></v-text-field>
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
      senhaConfirm: ""
  }),
  methods: {
    changeForLogin() {
      this.$emit("change-form");
    },
    cadastrar(event) {
        event.preventDefault();
        if (this.senha != "" && this.name != "") {
            if (this.senha === this.senhaConfirm) {
                axios.post(`${this.urlBase}/user`, {name: this.name, senha: this.senha})  
            }
        }
    }
  },
};
</script>

<style>
</style>