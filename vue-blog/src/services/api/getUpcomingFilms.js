import http from "@/services/httpfilms";

export default {
    getUpcomingSection() {
        return http.get(`/movie/upcoming?api_key=5235e8164cdbeab41f75539ba6100f6b&page=${localStorage.getItem('currentPage')}`)
    }
}