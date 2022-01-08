<template>
  <v-card width="150" class="pt-2">
    <v-img
      height="80px"
      contain
      :src="pokemonData.sprites.other.dream_world.front_default"
    ></v-img>
    <v-card-title class="name-poke">{{ pokemon.name }}</v-card-title>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["pokemon"],
  data: () => ({
    pokemonData: [],
  }),
  mounted() {
    if (this.pokemon.url) {
      this.getPokemon(this.pokemon.url);
    }else{
      this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}`);
    }
  },
  methods: {
    getPokemon(url) {
      axios.get(url).then((resp) => {
        this.pokemonData = resp.data;
      });
    },
  },
};
</script>

<style scoped>
.name-poke {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>