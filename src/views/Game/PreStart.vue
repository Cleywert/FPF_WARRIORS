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

      <section v-if="pokemonSelected == null" class="mt-3">
        <p>Escolha um Pokémon</p>
        <v-text-field
          v-model="search"
          label="Buscar um Pokémon"
          append-icon="mdi-magnify"
          clearable
        ></v-text-field>

        <ListPokemons :pokemons="pokemons" class="mb-3" @selected="selectPokemon"></ListPokemons>
        <v-pagination
          v-model="page"
          :length="totalPages"
          color="plaing"
          total-visible="22"
          prev-icon="mdi-menu-left"
          next-icon="mdi-menu-right"
        ></v-pagination>
      </section>
      <section v-else class="text-center mt-5">
        <p class="text-h5">Pokémon Selecionado: </p>
        <CardPokemon :pokemon="pokemonSelected" :selected="true" class="mx-auto" @unselected="pokemonSelected=null"></CardPokemon>
      </section>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import CardPokemon from "@/components/atoms/card-pokemon.vue";
import ListPokemons from "@/components/molecules/list-pokemons.vue";
import PlayerTemporary from "@/components/molecules/player-temporary.vue";
export default {
  data: () => ({
    page: 1,
    search: "",
    pokemons: [],
    pokemonSelected: null
  }),
  components: { PlayerTemporary, ListPokemons, CardPokemon },
  computed: {
    totalPages() {
      return Math.ceil(899 / 18);
    },
  },
  watch: {
    search() {
      this.searchPokemon();
    },
    page() {
      this.searchPerPage();
    },
  },
  created() {
    this.getPokemons();
  },
  methods: {
    searchPokemon() {
      let pokemon = this.search;
      if (pokemon == null || pokemon == "") {
        this.searchPerPage();
      }
      const pokeSearch = pokemon.toLowerCase();
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}`)
        .then((resp) => {
          this.pokemons = resp.data;
          console.log(resp.data);
        });
    },
    searchPerPage() {
      this.pokemons = [];
      const offset = (this.page - 1) * 18;
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`)
        .then((resp) => {
          this.pokemons = resp.data;
        });
    },
    getPokemons() {
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=18").then((resp) => {
        this.pokemons = resp.data;
      });
    },
    selectPokemon(pokemon) {
      this.pokemonSelected = pokemon;
    }
  },
};
</script>