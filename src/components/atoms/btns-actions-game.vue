<template>
  <div class="d-flex justify-center controles">
    <v-btn color="primary" class="mr-3" @click="ataque">
      <v-icon>mdi-sword</v-icon> ATAQUE BÁSICO
    </v-btn>
    <v-btn
      color="plaing"
      :disabled="special > 0"
      class="mr-3"
      @click="ataqueEspecial"
    >
      <v-icon>mdi-star-shooting-outline</v-icon> ATAQUE ESPECIAL
    </v-btn>
    <v-btn color="success" class="mr-3" @click="curar">
      <v-icon class="mr-1">mdi-heart-plus-outline</v-icon> CURAR
    </v-btn>
    <v-btn link color="error" to="/">
      <v-icon>mdi-flag-variant-outline </v-icon> DESISTIR
    </v-btn>
  </div>
</template>

<script>
export default {
    props: ["special"],
    methods: {
        ataque() {
            this.$emit("ataque")
        },
        ataqueEspecial() {
            this.$emit("ataque-especial")
        },
        curar() {
            this.$emit("cura")
        },
    }
};
</script>

<style>
</style>