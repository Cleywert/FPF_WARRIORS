<template>
  <section>
      <NavBar></NavBar>
    <v-container>
      <ConteudoHome></ConteudoHome>
      <BotoesAcoes></BotoesAcoes>
    </v-container>
  </section>
</template>

<script>
import NavBar from "@/components/organisms/toolbar.vue";
import BotoesAcoes from "@/components/molecules/btns-home.vue";
import ConteudoHome from "@/components/atoms/conteudo-home.vue";
export default {
  name: "Home",
  components: { ConteudoHome, BotoesAcoes, NavBar },
};
</script>
