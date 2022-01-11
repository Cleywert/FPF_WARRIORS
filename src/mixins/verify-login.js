import axios from "axios";
import { mapActions } from "vuex";
export default {
    methods: {
        ...mapActions(['start_session']),
        verificaLogin() {
            const login = JSON.parse(window.localStorage.userLog);
            if(Date.now() - login.time < 86400000) {
                axios.get(`${this.urlBase}/user/${login.name}`).then(response => {
                    this.start_session({...response.data, time: Date.now()})
                })
            }
        }
    }
}