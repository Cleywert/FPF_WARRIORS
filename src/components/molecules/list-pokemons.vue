<template>
  <div>
    <transition mode="out-in" name="pokemons">

      <v-row v-if="pokemons.results" align="center">
        <v-col v-for="(pokemon, id) in pokemons.results" :key="id">
          <CardPokemon
            :pokemon="pokemon"
            :selected="false"
            @selected="select"
            @favoritar="favoritar"
            @desfavoritar="desfavoritar"
          ></CardPokemon>
        </v-col>
      </v-row>

      <CardPokemon
        v-else
        :pokemon="pokemons"
        :selected="false"
        @selected="select"
        @favoritar="favoritar"
        @desfavoritar="desfavoritar"
      ></CardPokemon>
    </transition>
  </div>
</template>

<script>
import CardPokemon from "@/components/atoms/card-pokemon.vue";
export default {
  props: ["pokemons"],
  components: { CardPokemon },
  methods: {
    favoritar(pokemon) {
      this.$emit("favoritar", pokemon);
    },
    desfavoritar(pokemon) {
      this.$emit("desfavoritar", pokemon)
    },
    select(pokemon) {
      this.$emit("selected", pokemon);
    },
  },
};
</script>

<style>
.pokemons-enter,
.pokemons-leave-to {
  opacity: 0;
  transform: translate3d(0, -50px, 0);
}
.pokemons-enter-active,
.pokemons-leave-active {
  transition: all 0.4s;
}
</style>