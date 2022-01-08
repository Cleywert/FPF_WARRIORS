<template>
  <section>
    <v-container>
      <PlayerTemporary></PlayerTemporary>

      <div class="text-center mt-2">
        <v-btn x-large color="plaing" ondbclick>
          <v-icon>mdi-play-outline</v-icon>
          INICIAR PARTIDA
        </v-btn>
      </div>

      <section class="mt-3">
        <p>Escolha um Pokémon</p>
        <v-text-field
          v-model="search"
          label="Buscar um Pokémon"
          append-icon="mdi-magnify"
          clearable
        ></v-text-field>

        <ListPokemons :pokemons="pokemons"></ListPokemons>
      </section>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import ListPokemons from "@/components/molecules/list-pokemons.vue";
import PlayerTemporary from "@/components/molecules/player-temporary.vue";
export default {
  data: () => ({
    pokemons: [],
    search: "",
  }),
  components: { PlayerTemporary, ListPokemons },
  watch: {
    search(value){
      this.searchPokemon(value)
    }
  },
  created() {
    this.getPokemons();
  },
  methods: {
    searchPokemon(value) {
      let pokemon = value
      if (pokemon == null) {
        pokemon = ""
      }
      let pokeSearch = pokemon.toLowerCase()
      axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}`).then(resp => {
        this.pokemons = resp.data
        console.log(resp.data);
      })
    },
    getPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=18").then((resp) => {
        this.pokemons = resp.data;
      });
    },
  },
};
</script>