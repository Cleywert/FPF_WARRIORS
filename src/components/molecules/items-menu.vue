<template>
  <div class="d-flex align-center">
    <v-list-item>REGRAS</v-list-item>
    <v-list-item>JOGAR</v-list-item>
    <BtnLogin></BtnLogin>
  </div>
</template>

<script>
import BtnLogin from "@/components/atoms/btn-login.vue";
export default {
  components: { BtnLogin },
};
</script>