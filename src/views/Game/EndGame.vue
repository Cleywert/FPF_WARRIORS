<template>
  <section>
    <v-container class="text-center">
      <h1 class="text-h2" v-if="resultado.vitoria">VITÓRIA</h1>
      <h1 class="text-h2" v-else>DERROTA</h1>

      <p class="mb-0">Pontos na partida: {{ resultado.pontos }}</p>
      <p v-if="userData.name">Total de pontos: {{ userData.score }}</p>

      <v-btn link to="/" color="primary" class="mr-2">
        <v-icon class="mr-1">mdi-home-outline</v-icon> Home
      </v-btn>
      <v-btn link to="/game/start" color="plaing">
        <v-icon class="mr-1">mdi-gamepad-variant-outline</v-icon> Jogar
        Novamente
      </v-btn>
      <BtnRanking />

      <div class="mt-5 mx-auto detalhes">
        <DetalhesPartida :logs="resultado.logs"></DetalhesPartida>
      </div>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import BtnRanking from "@/components/atoms/btn-ranking.vue";
import DetalhesPartida from "@/components/atoms/detalhes-partida.vue";
export default {
  data: () => ({
    resultado: null,
    userData: null,
  }),
  components: {
    BtnRanking,
    DetalhesPartida,
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getUser();
    this.resultado = this.$route.params.resultado;
    if (!this.user.time) {
      this.updateScore();
    }
    if (!this.resultado) {
      this.$router.push({path: "/game"})
    }
  },
  methods: {
    ...mapMutations(["SET_USER"]),
    getUser() {
      if (this.user.time) {
        axios.get(`${this.urlBase}/user/${this.user.name}`).then((response) => {
          this.userData = response.data;
          this.updateScore();
        });
      } else {
        this.userData = this.user;
      }
    },
    updateScore() {
      if (this.user.time) {
        const newScore = this.userData.score + this.resultado.pontos;
        axios
          .put(`${this.urlBase}/user/${this.userData.name}`, {
            score: newScore,
          })
          .then((response) => {
            this.userData = response.data;
          });
      } else {
        this.userData.score += this.resultado.pontos;
        this.SET_USER(this.userData)
      }
    },
  },
};
</script>

<style scoped>
.detalhes {
  max-width: 800px;
}
</style>