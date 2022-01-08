<template>
  <div class="d-flex justify-center">
      <PlayGame></PlayGame>
      <BtnRanking></BtnRanking>
    </div>
</template>

<script>
import BtnRanking from "@/components/atoms/btn-ranking.vue";
import PlayGame from "@/components/atoms/btn-play-game.vue";
export default {
    components: {PlayGame, BtnRanking}
}
</script>