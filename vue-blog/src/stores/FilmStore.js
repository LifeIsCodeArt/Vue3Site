import {ref} from 'vue'
import {defineStore} from 'pinia'
import getCurrentFilm from "../services/api/getCurrentFilmData.js";
import getCreditsSection from "../services/api/getCurrentFilmCredits.js";
import getKeywordsSection from "../services/api/getCurrentFilmKeywords.js";
import getImageSection from "../services/api/getCurrentFilmBackgrounds.js";
import getReviewsSection from "../services/api/getCurrentFilmReviews.js";

export const useCurrentFilmStore = defineStore('currentFilm', () => {
    const getCurrentFilmData = ref([])
    const getCurrentFilmUl = async () => {
        try {
            const res = await getCurrentFilm.getCurrentFilm()
            getCurrentFilmData.value = res.data
            console.log(getCurrentFilmData.value)
            console.log(getCurrentFilmData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getCurrentFilmData, getCurrentFilmUl}

})

export const useCreditsStore = defineStore('Credits', () => {
    const getCreditsData = ref([])
    const getCreditsCrew = ref([])
    const getCreditsUl = async () => {
        try {
            const res = await getCreditsSection.getCurrentFilmCredits()
            getCreditsData.value = res.data
            getCreditsCrew.value = res.data.crew.filter((item) =>item.job === 'Writer' || item.job === 'Director')
            console.log(getCreditsData.value)

        }
        catch (err) {
            console.log(err)
        }
    }

    return {
            getCreditsData,
            getCreditsUl,
            getCreditsCrew
            }

})

export const useKeywordsStore = defineStore('Keywords', () => {
    const getKeywordsData = ref([])
    const getKeywordsUl = async () => {
        try {
            const res = await getKeywordsSection.getCurrentFilmKeywords()
            getKeywordsData.value = res.data.keywords
            console.log(getKeywordsData.value)


        }
        catch (err) {
            console.log(err)
        }
    }

    return {getKeywordsData, getKeywordsUl}

})

export const useBackgroundStore = defineStore('Images', () => {
    const getImagesData = ref([])
    const getImagesUl = async () => {
        try {
            const res = await getImageSection.getCurrentFilmBackgrounds()
            getImagesData.value = res.data.backdrops[1]
            console.log(getImagesData.value)

        }
        catch (err) {
            console.log(err)
        }
    }

    return {getImagesData, getImagesUl}

})

export const useReviewsStore = defineStore('Reviews', () => {
    const getReviewsData = ref([])
    const getReviewsUl = async () => {
        try {
            const res = await getReviewsSection.getCurrentFilmReviews()
            getReviewsData.value = res.data
            console.log(getReviewsData.value)


        }
        catch (err) {
            console.log(err)
        }
    }

    return {getReviewsData, getReviewsUl}

})