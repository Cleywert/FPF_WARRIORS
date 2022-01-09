<template>
  <div class="cont-login">
    <v-card width="800" class="mx-auto">
      <div class="d-flex align-center justify-space-between">
        <transition mode="out-in" name="forms">
            <component :is="componentAlive" class="cont-form ml-7 pb-4" @change-form="changeForm"></component>
        </transition>
        <div class="cont-img d-flex align-center">
          <v-img src="@/assets/images/pic_login.jpg"></v-img>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import FormLogin from "@/components/atoms/form-login.vue";
import FormCadastro from "@/components/atoms/form-cadastro.vue";
export default {
  name: "Login",
  data: () => ({
    componentAlive: "FormLogin",
  }),
  components: { FormLogin, FormCadastro },
  methods: {
    changeForm() {
      if (this.componentAlive === "FormLogin") {
        this.componentAlive = "FormCadastro";
      } else {
        this.componentAlive = "FormLogin";
      }
    },
  },
};
</script>

<style>
.cont-login {
  height: 100vh;
  display: flex;
  align-items: center;
}
.cont-form {
  width: 60%;
}
.cont-img {
  width: 30%;
  height: 100%;
  box-shadow: -4px 0 3px 0 rgba(32, 207, 230, 0.5);
}

.forms-enter, .forms-leave-to{
    opacity: 0;
    transform: translate3d(90px, 0, 0);
}
.forms-enter-active, .forms-leave-active{
    transition: all .6s;
}
</style>