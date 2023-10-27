import http from "@/services/http";

export default {
    getMainPageData() {
        return http.get(`/products`)
    }
}