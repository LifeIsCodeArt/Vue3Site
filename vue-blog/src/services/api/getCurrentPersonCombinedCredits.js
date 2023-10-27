import http from "@/services/httpfilms";
export default {
    getCombinedCreditsSection() {
        return http.get(`/person/${localStorage.getItem('currentCharacter')}/combined_credits?api_key=5235e8164cdbeab41f75539ba6100f6b`)
    }
}