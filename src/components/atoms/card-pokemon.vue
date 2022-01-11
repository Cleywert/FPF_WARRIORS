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
    <v-card-title class="name-poke text-truncate"
      >{{ pokemonData.name }}
    </v-card-title>
    <v-card-actions>
      <v-btn v-if="!selected" outlined small @click="select">SELECIONAR</v-btn>
      <v-btn v-else small light color="#FFF" @click="unselect">DESCARTAR</v-btn>
      <v-btn
        v-if="user && user.time && !favoritos.includes(pokemonData.id)"
        icon
        small
        color="error"
        @click="favoritar"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn
        v-if="favoritos.includes(pokemonData.id)"
        icon
        small
        color="error"
        @click="desfavoritar"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
export default {
  props: ["pokemon", "selected"],
  data: () => ({
    pokemonData: [],
    favoritos: [],
  }),
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    user() {
      this.getFavoritos();
    }
  },
  created() {
    if (this.pokemon.url) {
      this.getPokemon(this.pokemon.url);
    } else if (this.pokemon.name) {
      this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.pokemon.name}`);
    } else {
      this.getPokemon(`https://pokeapi.co/api/v2/pokemon/${this.pokemon}`);
    }
    this.getFavoritos();
  },
  methods: {
    select() {
      this.$emit("selected", this.pokemon);
    },
    unselect() {
      this.$emit("unselected");
    },
    favoritar() {
      this.$emit("favoritar", this.pokemonData.id);
    },
    desfavoritar() {
      this.$emit("desfavoritar", this.pokemonData.id);
    },
    getPokemon(url) {
      axios.get(url).then((resp) => {
        this.pokemonData = resp.data;
        this.pokemon = this.pokemonData;
      });
    },
    getFavoritos() {
      if (this.user.favoritos === null) this.favoritos = [];
      this.favoritos = this.user.favoritos.split(",");
      this.favoritos = this.favoritos.map(element => parseInt(element))
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