import http from "@/services/httpfilms";
export default {
    getTvSearchSection() {
        return http.get(`/search/tv?api_key=5235e8164cdbeab41f75539ba6100f6b&query=${localStorage.getItem('currentSearchReq')}&page=${localStorage.getItem('currentPage')}`)
    }
}