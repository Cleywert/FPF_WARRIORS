<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        Ver detalhes da partida
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-card
          tile
          text
          outlined
          width="100%"
          elevation="0"
          :class="log.type == 'monstro' ? 'text-right' : 'text-left'"
          class="py-1 px-3"
          v-for="(log, id) in logs"
          :key="id"
        >
          <p class="mb-0">{{ log.action }} - Turno {{ log.turno }}</p>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
    props: ["logs"]
};
</script>

<style>
</style>