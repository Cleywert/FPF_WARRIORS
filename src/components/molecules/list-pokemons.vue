<template>
  <div>
    <v-row v-if="pokemons.results">
      <v-col v-for="(pokemon, id) in pokemons.results" :key="id">
        <CardPokemon :pokemon="pokemon"></CardPokemon>
      </v-col>
    </v-row>
    <!-- <p v-else>{{pokemons.url}}</p> -->
    <CardPokemon v-else :pokemon="pokemons"></CardPokemon>
  </div>
</template>

<script>
import CardPokemon from "@/components/atoms/card-pokemon.vue";
export default {
  props: ["pokemons"],
  components: {CardPokemon}
};
</script>