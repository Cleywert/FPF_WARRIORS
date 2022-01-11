<template>
  <section>
    <v-container>
      <PlayerTemporary v-if="!user || !user.time"></PlayerTemporary>
      <v-snackbar
        v-model="snackbar"
        top
        timeout="3000"
        color="error"
        transition="slide-y-transition"
      >
        {{ message }}
      </v-snackbar>

      <div class="mt-2 text-center">
        <div class="mb-2">
          <v-btn x-large color="plaing" @click="startGame">
            <v-icon>mdi-play-outline</v-icon>
            INICIAR PARTIDA
          </v-btn>
        </div>
        <div>
          <v-btn link to="/" color="info">
            <v-icon class="mr-2">mdi-home-outline</v-icon>
            VOLTAR PARA HOME
          </v-btn>
        </div>
      </div>

      <SelectPokemon
        v-if="pokemonSelected == null"
        class="mt-3"
        @selected="selectPokemon"
      ></SelectPokemon>
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
import { mapState, mapActions } from "vuex";
import login from "@/mixins/verify-login.js";
import CardPokemon from "@/components/atoms/card-pokemon.vue";
import SelectPokemon from "@/components/organisms/select-pokemon.vue";
import PlayerTemporary from "@/components/molecules/player-temporary.vue";
export default {
  data: () => ({
    snackbar: false,
    message: "",
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
    ...mapActions(["set_combate"]),
    selectPokemon(pokemon) {
      this.pokemonSelected = pokemon;
    },
    startGame() {
      if (!this.user) {
        this.message = "Insira um user name";
        this.snackbar = true;
      } else {
        if (!this.pokemonSelected) {
          this.message = "Selecione um Pokémon";
          this.snackbar = true;
        } else {
          let idAdversario = 0;
          do {
            idAdversario = Math.floor(Math.random() * 899);
          } while (idAdversario === this.pokemonSelected.id);

          const adversario = idAdversario;
          this.set_combate({ pokemon: this.pokemonSelected, adversario });
          this.$router.push("/game/fight");
        }
      }
    },
  },
};
</script>
