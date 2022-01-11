<template>
  <v-expansion-panel>
    <v-expansion-panel-header><slot name="titulo"></slot></v-expansion-panel-header>
    <v-expansion-panel-content>
      <slot name="conteudo"></slot>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
export default {};
</script>

<style>
</style>