<template>
  <v-card :color="color">
    <v-card-title>
      <p class="text-center text-h5">Regras</p>
    </v-card-title>
    <v-card-text>
      <v-expansion-panels>
        <ExpPanel>
          <template #titulo>COMO JOGAR</template>
          <template #conteudo>
            <ul>
              <li>Insira um nome temporário caso não esteja logado</li>
              <li>Selecione um Pokémon para usar no duelo</li>
            </ul>
          </template>
        </ExpPanel>

        <ExpPanel>
          <template #titulo>RANKEAMENTO</template>
          <template #conteudo>
            <p>
              O ranking de jogadores leva em consideração apenas jogadores
              cadastrados, mas você pode jogar com um user_name temporario e
              acumular pontos durante uma sessão.
            </p>
            <p>
              A pontuação no fim de cada partida é calculada pela seguinte
              fórmula:
              <br>
              (<i>PONTOS DE VIDA RESTANTES</i> * <i>1000</i>) / <i>QUANTIDADE DE TURNOS</i>
            </p>
          </template>
        </ExpPanel>
        
        <ExpPanel>
          <template #[`titulo`]>DINÂMICA DO JOGO</template>
          <template #conteudo>
            <p>
              O jogo iniciará após a sua escolha de personagem. A partida é
              dividida em turnos, em cada turno você pode realizar uma ação e
              receberá um dano de ataque na vez do adversário.
              <br />
              Você sempre iniciará jogando, portanto, seu adversário atacará
              logo depois de sua ação
            </p>
            <p>Durante o jogo você conta com 4 botões de ação:</p>
            <ul>
              <li>
                <b>Ataque Basico:</b> Um ataque que causa dano ao adversário
                entre 5 e 10 pontos de vida, aleatoriamente
              </li>
              <li>
                <b>Ataque Especial:</b> Um ataque que causa dano ao adversário
                entre 10 e 20 pontos de vida, aleatoriamente
                <br />
                O ataque especial tem 50% de chance de atordoar o adversário po
                1 turno.
              </li>
              <li>
                <b>Curar:</b> Ação de cura seus pontos de vida entre 5 e 15
                pontos, aleatoriamente
              </li>
              <li>
                <b>Desistir:</b> Encerra a partida e retorna à tela inicial
              </li>
            </ul>
            <p>Ataques do adversário:</p>
            <ul>
              <li>
                <b>Ataque básico:</b> O adversário realizará um ataque que lhe
                causará um dano aleatório entre 6 e 12 pontos de vida
              </li>
              <li>
                <b>Ataque especial:</b> O adversário realizará um ataque que lhe
                causará um dano aleatório entre 8 e 16 pontos de vida
              </li>
            </ul>
            <p>
              Tanto seu Pokémon quanto o do adversário terá uma barra de vida
              que inicia na coloração VERDE e permanece enquanto a vida for
              maior ou igual a 50. A coloração da barra mudará para AMARELO
              quando avida estiver entre 20 e 49 ponto e para VERMELHO quando
              estiver abaixo de 20 pontos. Ambos iniciam a partida com 100
              pontos de vida.
            </p>
          </template>
        </ExpPanel>
      </v-expansion-panels>
    </v-card-text>
  </v-card>
</template>

<script>
import ExpPanel from "@/components/atoms/painel.vue";
export default {
  props:["color"],
  components: {
    ExpPanel
  }
};
</script>

<style>
</style>