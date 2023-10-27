import http from "@/services/httpfilms";
export default {
    getPersonImagesSection() {
        return http.get(`/person/${localStorage.getItem('currentCharacter')}/images?api_key=5235e8164cdbeab41f75539ba6100f6b`)
    }
}