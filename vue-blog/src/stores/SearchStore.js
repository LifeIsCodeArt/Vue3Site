import {ref} from 'vue'
import {defineStore} from 'pinia'
import getMovieSearchSection from "../services/api/getMovieSearchData.js";
import getTvSearchSection from "../services/api/getCurrentTvSearchData.js";
import getKeywordsSearchSection from "../services/api/getCurrentKeywordsSearchData";

export const useMovieSearchStore = defineStore('searchedFilms', () => {
    const getMovieSearchData = ref([])
    const getMovieTotal = ref('')
    const getMovieTotalPages = ref('')
    const getMovieSearchUl = async () => {
        try {
            const res = await getMovieSearchSection.getMovieSearchSection()
            getMovieSearchData.value = res.data.results
            getMovieTotal.value = res.data.total_results
            getMovieTotalPages.value = res.data.total_pages
            console.log(getMovieSearchData.value)
            console.log(getMovieSearchData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {
            getMovieSearchData,
            getMovieSearchUl,
            getMovieTotal,
            getMovieTotalPages
    }

})

export const useTvSearchStore = defineStore('searchedTvShows', () => {
    const getTvSearchData = ref([])
    const getTvSearchTotal = ref('')
    const getTvSearchTotalPages = ref('')
    const getTvSearchUl = async () => {
        try {
            const res = await getTvSearchSection.getTvSearchSection()
            getTvSearchData.value = res.data.results
            getTvSearchTotal.value = res.data.total_results
            getTvSearchTotalPages.value = res.data.total_pages
            console.log(getTvSearchData.value)
            console.log(getTvSearchData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {
            getTvSearchData,
            getTvSearchUl,
            getTvSearchTotal,
            getTvSearchTotalPages
           }

})

export const useKeywordsSearchStore = defineStore('searchedKeywords', () => {
    const getKeywordsSearchData = ref([])
    const getTotalResultsData = ref([])
    const getTotalPagesData = ref('')
    const getKeywordsSearchUl = async () => {
        try {
            const res = await getKeywordsSearchSection.getKeywordsSearchSection()
            getKeywordsSearchData.value = res.data.results
            getTotalResultsData.value = res.data.total_results
            getTotalPagesData.value = res.data.total_pages

        }
        catch (err) {
            console.log(err)
        }
    }

    return {
            getKeywordsSearchData,
            getKeywordsSearchUl,
            getTotalResultsData,
            getTotalPagesData
           }
})