import http from "@/services/httpfilms";
import {ref} from 'vue'
const currentFilm = ref(localStorage.getItem('currentFilm'))
export default {
    getCurrentFilmKeywords() {
        return http.get(`/movie/${currentFilm.value}/keywords?api_key=5235e8164cdbeab41f75539ba6100f6b`)
    }
}