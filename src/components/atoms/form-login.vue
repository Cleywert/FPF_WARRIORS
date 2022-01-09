<template>
  <div>
    <v-card-title class="pl-0">Login</v-card-title>
    <v-form>
      <v-text-field label="User Name" outlined></v-text-field>
      <v-text-field label="Senha" outlined></v-text-field>
      <v-btn block color="success">LOGIN</v-btn>
      <p class="my-2 text-center text-caption">ou</p>
      <v-btn block small color="plaing" @click="changeForLogin">CADASTRE-SE</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
    methods: {
        changeForLogin() {
            this.$emit("change-form")
        }
    }
};
</script>

<style>
</style>