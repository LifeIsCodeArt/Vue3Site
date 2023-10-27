import http from "@/services/http";

export default {
    getUserData(data) {
        return http.post('/users', data)
    }
}