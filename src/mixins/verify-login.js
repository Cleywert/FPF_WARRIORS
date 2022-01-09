import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions(['start_session']),
        verificaLogin() {
            const login = JSON.parse(window.localStorage.userLog);
            if(Date.now() - login.time < 86400000) {
                delete login.time;
                this.start_session(login)
            }
        }
    }
}