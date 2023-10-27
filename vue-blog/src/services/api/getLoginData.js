import http from "@/services/http";

export default {
    getUsers() {
        return http.get(`/users`)
    }
}