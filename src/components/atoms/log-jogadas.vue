<template>
  <transition-group
    tag="div"
    name="log"
    class="log-jogadas d-flex flex-column-reverse align-start"
  >
    <v-card
      tile
      outlined
      width="100%"
      elevation="0"
      :color="log.color"
      :class="log.type == 'monstro' ? 'text-right' : ''"
      class="py-1 px-3"
      v-for="log in logs"
      :key="log"
    >
      <p class="mb-0">{{ log.action }} - Turno {{ log.turno }}</p>
    </v-card>
  </transition-group>
</template>

<script>
export default {
  props: ["logs"],
};
</script>

<style scoped>
.log-enter,
.log-leave-to {
  opacity: 0;
  transform: translate3d(-10px, 0, 0);
}
.log-enter-active,
.log-leave-active {
  transition: all 1s;
}
</style>