import http from "@/services/httpfilms";
const currentSearchReq = localStorage.getItem('currentSearchReq')
export default {
    getMovieSearchSection() {
        return http.get(`/search/movie?api_key=5235e8164cdbeab41f75539ba6100f6b&query=${localStorage.getItem('currentSearchReq')}&page=${localStorage.getItem('currentPage')}`)
    }
}