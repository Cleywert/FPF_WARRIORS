<template>
  <div class="text-center">
    <p>
      <router-link to="/login">Crie uma conta</router-link>
      para salvar suas preferências
    </p>
    <p>ou</p>
    <FormPlayer></FormPlayer>
  </div>
</template>

<script>
import FormPlayer from "@/components/atoms/form-player-temporary.vue";
export default {
    components: {FormPlayer}
};
</script>