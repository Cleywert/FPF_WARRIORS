<template>
  <div>
    <v-list class="py-0 mb-8">
      <v-list-item dense>
        <span class="posicao">Posição</span>
        <v-spacer></v-spacer>
        <span>Nome</span>
        <v-spacer></v-spacer>
        <span class="pontos">Pontuação</span>
      </v-list-item>
    </v-list>
    <v-card v-for="(user, id) in ranking" :key="id" class="px-4 mb-4">
      <v-card-text class="d-flex">
        <v-img v-if="id==0" src="@/assets/images/award.png" height="32" width="32" class="trofeu"></v-img>
        <span class="posicao">{{ id + 1 }}</span>
        <v-spacer></v-spacer>
        <span>{{ user.name }}</span>
        <v-spacer></v-spacer>
        <span class="pontos text-center">{{ user.score }}</span>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    ranking: [],
  }),
  created() {
    this.getRanking();
  },
  methods: {
    getRanking() {
      axios.get(`${this.urlBase}/users/ranking`).then((response) => {
        this.ranking = response.data;
      });
    },
  },
};
</script>

<style scoped>
.posicao {
  width: 100px;
}
.pontos {
  width: 100px;
  text-align: right;
}
.trofeu {
  position: absolute;
  left: -16px;
}
</style>