<template>
  <section>
      <NavBar></NavBar>
      <v-container>
          <h1 class="text-center text-h4 mt-4">Ranking dos Jogadores</h1>
          <RankingJogadores class="mt-12"></RankingJogadores>
      </v-container>
  </section>
</template>

<script>
import NavBar from "@/components/organisms/toolbar.vue";
import RankingJogadores from "@/components/molecules/ranking.vue";
export default {
    components: {NavBar, RankingJogadores}
}
</script>

<style>

</style>