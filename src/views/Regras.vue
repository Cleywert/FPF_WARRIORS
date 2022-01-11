<template>
  <section>
    <NavBar></NavBar>
    <v-container>
      <CardRegras color="secondary"></CardRegras>
    </v-container>
  </section>
</template>

<script>
import NavBar from "@/components/organisms/toolbar";
import CardRegras from "@/components/molecules/card-regras";
export default {
  components: { NavBar, CardRegras },
};
</script>

<style>
</style>