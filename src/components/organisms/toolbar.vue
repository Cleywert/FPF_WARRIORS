<template>
  <v-toolbar elevation="2">
    <v-container class="py-0 d-flex align-center">
      <v-toolbar-title class="ml-2">
        <router-link to="/"> FPF Warriors </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <ItemsMenu></ItemsMenu>
    </v-container>
  </v-toolbar>
</template>

<script>
import ItemsMenu from "@/components/molecules/items-menu.vue";
export default {
  components: { ItemsMenu },
};
</script>

<style scoped>
a {
  color: #FFF !important;
  text-decoration: none !important;
}
</style>