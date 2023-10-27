import http from "@/services/httpfilms";
export default {
    getPersonDetailsSection() {
        return http.get(`/person/${localStorage.getItem('currentCharacter')}?api_key=5235e8164cdbeab41f75539ba6100f6b`)
    }
}