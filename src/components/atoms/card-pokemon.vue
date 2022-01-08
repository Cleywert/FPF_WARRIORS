<template>
  <v-card width="150" class="pt-2">
    <v-img
      height="80px"
      contain
      :src="
        pokemonData.sprites.other.dream_world.front_default
          ? pokemonData.sprites.other.dream_world.front_default
          : pokemonData.sprites.front_default
      "
    ></v-img>
    <v-card-title class="name-poke text-truncate">{{ pokemon.name }}</v-card-title>
    <v-card-actions>
      <v-btn v-if="!selected" outlined small @click="select">SELECIONAR</v-btn>
      <v-btn v-else small light color="#FFF" @click="unselect">DESCARTAR</v-btn>
      <v-btn icon small color="error">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  props: ["pokemon", "selected"],
  data: () => ({
    pokemonData: [],
  }),
  created() {
    if (this.pokemon.url) {
      this.getPokemon(this.pokemon.url);
    } else {
      this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}`);
    }
  },
  methods: {
    select() {
      this.$emit('selected', this.pokemon)
    },
    unselect() {
      this.$emit('unselected')
    },
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
}
</style>