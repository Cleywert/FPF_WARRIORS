<template>
  <section>
    <v-container class="text-center">
      <h1 class="text-h2" v-if="resultado.vitoria">VITÓRIA</h1>
      <h1 class="text-h2" v-else>DERROTA</h1>
      <p>Pontos na partida: {{ resultado.pontos }}</p>
      <v-btn link to="/" color="primary" class="mr-2">
        <v-icon class="mr-1">mdi-home-outline</v-icon> Home
      </v-btn>
      <v-btn link to="/game/start" color="plaing">
        <v-icon class="mr-1">mdi-gamepad-variant-outline</v-icon> Jogar Novamente
      </v-btn>
      <BtnRanking/>

      <div class="mt-5 detalhes">
        <DetalhesPartida :logs="resultado.logs"></DetalhesPartida>
      </div>
    </v-container>
  </section>
</template>

<script>
import BtnRanking from "@/components/atoms/btn-ranking.vue";
import DetalhesPartida from "@/components/atoms/detalhes-partida.vue";
export default {
  data: () => ({
    resultado: null,
  }),
  components: {
      BtnRanking,
      DetalhesPartida
  },
  mounted() {
    this.resultado = this.$route.params.resultado;
  },
};
</script>

<style scoped>
.detalhes{
    max-width: 800px;
}
</style>