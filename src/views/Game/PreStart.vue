<template>
  <section>
    <v-container>
      <PlayerTemporary v-if="!user"></PlayerTemporary>

      <div class="mt-2 text-center">
        <div class="mb-2">
          <v-btn x-large color="plaing" ondbclick>
            <v-icon>mdi-play-outline</v-icon>
            INICIAR PARTIDA
          </v-btn>
        </div>
        <div>
          <v-btn color="info">
            <v-icon class="mr-2">mdi-home-outline</v-icon>
            VOLTAR PARA HOME
            </v-btn>
        </div>
      </div>

      <SelectPokemon v-if="pokemonSelected == null" class="mt-3" @selected="selectPokemon"></SelectPokemon>
      <section v-else class="text-center mt-5">
        <p class="text-h5">Pokémon Selecionado:</p>
        <CardPokemon
          :pokemon="pokemonSelected"
          :selected="true"
          class="mx-auto"
          @unselected="pokemonSelected = null"
        ></CardPokemon>
      </section>
    </v-container>
  </section>
</template>

<script>
import { mapState } from "vuex";
import login from "@/mixins/verify-login.js";
import SelectPokemon from "@/components/organisms/select-pokemon.vue";
import CardPokemon from "@/components/atoms/card-pokemon.vue";
import PlayerTemporary from "@/components/molecules/player-temporary.vue";
export default {
  data: () => ({
    pokemonSelected: null,
  }),
  mixins: [login],
  components: { PlayerTemporary, SelectPokemon, CardPokemon },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.verificaLogin();
  },
  methods: {
    selectPokemon(pokemon) {
      this.pokemonSelected = pokemon;
    },
  },
};
</script>
