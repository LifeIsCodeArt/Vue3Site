import http from "@/services/http";
export default {
    getPersonCommentSection() {
        return http.get(`/products/${localStorage.getItem('currentPost')}`)
    }
}