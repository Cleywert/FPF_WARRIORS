<template>
  <section>
    <v-dialog v-model="showRules">
        <CardRegras color="primary"></CardRegras>
    </v-dialog>
    <v-container>
      <div class="arena mx-auto">
        <div class="personagem personagem-r">
          <v-img
            height="100"
            width="100"
            :src="advPokemon.sprites.front_default"
          ></v-img>
          <p class="mb-1 text-center text-caption">
            {{ advPokemon.name.toUpperCase() }}
            <v-icon v-if="atordoado" small color="error">mdi-cancel</v-icon>
          </p>
          <v-progress-linear
            v-model="enemyLife"
            height="20"
            :color="
              enemyLife >= 50 ? 'green' : enemyLife >= 20 ? 'yellow' : 'red'
            "
          >
            <template #[`default`]="{ value }"> {{ value }} PV </template>
          </v-progress-linear>
        </div>

        <div class="personagem mt-16">
          <v-img
            height="150"
            width="150"
            :src="myPokemon.sprites.back_default"
          ></v-img>
          <p class="mb-1 text-center text-caption">
            {{ pokemon.name.toUpperCase() }}
          </p>
          <v-progress-linear
            v-model="life"
            height="20"
            :color="life >= 50 ? 'green' : life >= 20 ? 'yellow' : 'red'"
          >
            <template #[`default`]="{ value }"> {{ value }} PV </template>
          </v-progress-linear>
        </div>
      </div>

      <LogJogadas :logs="actions" class="mt-4 mx-auto"></LogJogadas>
      <BtnsActions
        :special="special"
        @ataque="ataque('me')"
        @cura="curar"
        @show-info="showRules = true"
        @ataque-especial="ataqueEspecial('me')"
      ></BtnsActions>
    </v-container>
  </section>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import CardRegras from "@/components/molecules/card-regras.vue";
import LogJogadas from "@/components/atoms/log-jogadas.vue";
import BtnsActions from "@/components/atoms/btns-actions-game.vue";
export default {
  data: () => ({
    myPokemon: [],
    advPokemon: [],
    life: 100,
    enemyLife: 100,
    atordoado: false,
    special: 0,
    turno: 1,
    showRules: false,
    turnoEnemy: false,
    actions: [],
  }),
  components: { LogJogadas, BtnsActions, CardRegras },
  computed: {
    ...mapState(["pokemon", "adversario"]),
  },
  async created() {
    if (!this.pokemon) {
      this.$router.push({ path: "/game" });
    }
    await this.getPokemon();
    await this.getAdversario();
  },
  methods: {
    getPokemon() {
      if (this.pokemon.url) {
        axios.get(this.pokemon.url).then((response) => {
          this.myPokemon = response.data;
        });
      } else {
        this.myPokemon = this.pokemon;
      }
    },
    getAdversario() {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${this.adversario}`)
        .then((response) => {
          this.advPokemon = response.data;
        });
    },
    fimTurno() {
      if (this.enemyLife <= 0) this.endGame();

      if (this.special > 0) this.special--;

      if (!this.atordoado && this.enemyLife > 0) {
        this.turnoEnemy = true;
        window.setTimeout(() => {
          this.turnoInimigo();
        }, 1000);
      } else if (this.atordoado) {
        this.atordoado = false;
        this.turno++;
      }
    },
    turnoInimigo() {
      if (this.turno % 3 !== 0) {
        this.ataque("monstro");
      } else {
        this.ataqueEspecial("monstro");
      }
      this.turno++;
      if (this.life <= 0) this.endGame();
      this.turnoEnemy = false;
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    ataque(solicitado) {
      let dano;
      if (this.turnoEnemy && solicitado == "monstro") {
        dano = this.randomNumber(6, 12);
        this.life -= dano;
        this.actions.unshift({
          action: `${this.advPokemon.name.toUpperCase()} atacou você: dano ${dano}`,
          type: "monstro",
          color: "red",
          turno: this.turno,
        });
      } else if (!this.turnoEnemy) {
        dano = this.randomNumber(5, 10);
        this.enemyLife -= dano;
        this.actions.unshift({
          action: `VOCÊ atacou: dano ${dano}`,
          type: "me",
          color: "primary",
          turno: this.turno,
        });
        this.fimTurno();
      }
    },
    ataqueEspecial(solicitado) {
      let dano;
      if (this.turnoEnemy && solicitado == "monstro") {
        dano = this.randomNumber(8, 16);
        this.life -= dano;
        this.actions.unshift({
          action: `${this.advPokemon.name.toUpperCase()} atacou você: dano ${dano}`,
          type: "monstro",
          color: "orange",
          turno: this.turno,
        });
      } else if (!this.turnoEnemy) {
        this.special = 3;
        dano = this.randomNumber(10, 20);
        this.enemyLife -= dano;
        this.actions.unshift({
          action: `VOCÊ atacou: dano ${dano}`,
          type: "me",
          color: "plaing",
          turno: this.turno,
        });

        const atordoado = this.randomNumber(0, 1);
        if (atordoado) {
          this.atordoado = true;
          this.actions.unshift({
            action: `${this.advPokemon.name.toUpperCase()} ficou atordoado`,
            type: "monstro",
            color: "secondary",
            turno: this.turno,
          });
        }

        this.fimTurno();
      }
    },
    curar() {
      if (!this.turnoEnemy) {
        const cura = this.randomNumber(5, 15);
        this.life += cura;
        this.actions.unshift({
          action: `VOCÊ se curou:  +${cura}PV`,
          type: "me",
          color: "success",
        });
        this.fimTurno();
      }
    },
    endGame() {
      const resultado = {
        vitoria: true,
        pontos: 0,
        logs: this.actions.reverse(),
      };
      if (this.life <= 0) resultado.vitoria = false;
      resultado.pontos = Math.floor((this.life * 1000) / this.turno);
      this.$router.push({ name: "End Game", params: { resultado } });
    },
  },
};
</script>

<style scoped>
.log-jogadas {
  width: 50%;
  height: 120px;
  overflow: hidden;
  overflow-y: scroll !important;
}
.log-jogadas::-webkit-scrollbar {
  width: 8px;
  display: initial;
  background-color: transparent;
}
.log-jogadas::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #9c27b0;
}
.arena {
  width: 50%;
}
.personagem {
  width: 150px;
}
.personagem-r {
  width: 100px;
  margin-left: auto;
}
.controles {
  left: 50%;
  bottom: 0;
  position: absolute;
  transform: translate(-50%, -50%);
}
</style>