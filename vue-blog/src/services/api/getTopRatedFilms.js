import http from "@/services/httpfilms";

export default {
    getTopRatedSection() {
        return http.get(`movie/top_rated?api_key=5235e8164cdbeab41f75539ba6100f6b&page=${localStorage.getItem('currentPage')}`)
    }
}