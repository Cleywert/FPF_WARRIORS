<template>
  <div>
    <p class="mb-0">Insira um nome de usuário temporário</p>
    <v-row>
      <v-col sm="3" class="mx-auto">
        <v-text-field v-model="userName" label="Nome de usuário"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    userName: "",
  }),
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    userName(val) {
      if (this.user) {
        this.start_session({ name: val, score: this.user.score });
      } else {
        this.start_session({ name: val, score: 0 });
      }
    },
  },
  mounted() {
    if (this.user !== null) {
      this.userName = this.user.name;
    }
  },
  methods: {
    ...mapActions(["start_session"]),
  },
};
</script>