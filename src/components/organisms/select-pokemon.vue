<template>
  <section>
    <p>Escolha um Pokémon</p>
    <v-text-field
      v-model="search"
      label="Buscar um Pokémon"
      append-icon="mdi-magnify"
      clearable
    ></v-text-field>

    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="my-3" v-if="loading"></v-progress-circular>
    </div>
    <ListPokemons
      :pokemons="pokemons"
      class="mb-3"
      @selected="select"
    ></ListPokemons>
    <v-pagination
      v-model="page"
      :length="totalPages"
      color="plaing"
      total-visible="22"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </section>
</template>

<script>
import axios from "axios";
import ListPokemons from "@/components/molecules/list-pokemons.vue";
export default {
  data: () => ({
    page: 1,
    search: "",
    pokemons: [],
    loading: false,
  }),
  components: { ListPokemons },
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
    select(pokemon) {
      this.$emit("selected", pokemon);
    },
    searchPokemon() {
      this.loading = true;
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
          this.loading = false;
        });
    },
    searchPerPage() {
      this.loading = true;
      this.pokemons = [];
      const offset = (this.page - 1) * 18;
      axios
        .get(`https://pokeapi.co/api/v2/pokemon?limit=18&offset=${offset}`)
        .then((resp) => {
          this.pokemons = resp.data;
          this.loading = false;
        });
    },
    getPokemons() {
      this.loading = true;
      axios.get("https://pokeapi.co/api/v2/pokemon?limit=18").then((resp) => {
        this.pokemons = resp.data;
        this.loading = false;
      });
    },
  },
};
</script>