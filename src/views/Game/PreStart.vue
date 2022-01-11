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

      <div v-if="favoritos && !pokemonSelected" class="mt-3">
        <p>Pokémons favoritados</p>
        <div class="d-flex favoritos">
          <CardPokemon
            v-for="(pokemon, id) in favoritos"
            :key="id"
            :pokemon="pokemon"
            :selected="false"
            class="mr-3"
            @selected="selectPokemon"
            @desfavoritar="desfavoritar"
          ></CardPokemon>
        </div>
      </div>

      <SelectPokemon
        v-if="pokemonSelected == null"
        class="mt-2"
        @favoritar="favoritar"
        @selected="selectPokemon"
        @desfavoritar="desfavoritar"
      ></SelectPokemon>
      <section v-else class="text-center mt-5">
        <p class="text-h5">Pokémon Selecionado:</p>
        <CardPokemon
          :pokemon="pokemonSelected"
          :selected="true"
          class="mx-auto"
          @favoritar="favoritar"
          @unselected="pokemonSelected = null"
          @desfavoritar="desfavoritar"
        ></CardPokemon>
      </section>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import { mapState, mapActions } from "vuex";
import login from "@/mixins/verify-login.js";
import CardPokemon from "@/components/atoms/card-pokemon.vue";
import SelectPokemon from "@/components/organisms/select-pokemon.vue";
import PlayerTemporary from "@/components/molecules/player-temporary.vue";
export default {
  data: () => ({
    snackbar: false,
    message: "",
    favoritos: [],
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
  mounted() {
    this.getFavoritos();
  },
  methods: {
    ...mapActions(["set_combate", "start_session"]),
    selectPokemon(pokemon) {
      this.pokemonSelected = pokemon;
    },
    async getFavoritos() {
      await axios
        .get(`${this.urlBase}/user/${this.user.name}`)
        .then((response) => {
          this.favoritos = response.data.favoritos.split(",");
          this.start_session({ ...response.data, time: Date.now() });
        });
    },
    desfavoritar(pokemon) {
      const id = this.favoritos.indexOf(pokemon.toString());
      if (id > -1) this.favoritos.splice(id, 1);
      const favoritosString = this.favoritos.toString();
      axios
        .put(`${this.urlBase}/user/${this.user.name}`, {
          favoritos: favoritosString,
        })
        .then((response) => {
          this.start_session({ ...response.data, time: Date.now() });
        });
    },
    async favoritar(pokemon) {
      if (!this.favoritos.includes(pokemon)) {
        this.favoritos.push(pokemon);
        const favoritosString = this.favoritos.toString();
        await axios
          .put(`${this.urlBase}/user/${this.user.name}`, {
            favoritos: favoritosString,
          })
          .then((response) => {
            this.favoritos = response.data.favoritos.split(",");
            this.start_session({ ...response.data, time: Date.now() });
          });
      }
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

<style scoped>
.favoritos {
  overflow: hidden;
  overflow-x: scroll;
}
.favoritos::-webkit-scrollbar {
  height: 8px;
  display: initial;
  background-color: transparent;
}
.favoritos::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #9c27b0;
}
</style>