import {ref} from 'vue'
import {defineStore} from 'pinia'
import getDiscoverSection from "../services/api/getDiscoverFilms.js";
import getTopRatedSection from "../services/api/getTopRatedFilms.js";
import getUpcomingSection from "../services/api/getUpcomingFilms.js";

export const useDiscoverStore = defineStore('discoverFilms', () => {
    const getDiscoverData = ref([])
    const getDiscoverUl = async () => {
        try {
            const res = await getDiscoverSection.getDiscoverSection()
            getDiscoverData.value = res.data.results
            console.log(getDiscoverData.value)
            console.log(getDiscoverData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getDiscoverData, getDiscoverUl}

})

export const useTopRatedStore = defineStore('topRatedFilms', () => {
    const getTopRatedFilmsData = ref([])
    const getTopRatedUl = async () => {
        try {
            const res = await getTopRatedSection.getTopRatedSection()
            getTopRatedFilmsData.value = res.data.results
            console.log(getTopRatedFilmsData.value)
            console.log(getTopRatedFilmsData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getTopRatedFilmsData, getTopRatedUl}

})


export const useUpcomingStore = defineStore('upcomingFilms', () => {
    const getUpcomingFilmsData = ref([])
    const getUpcomingUl = async () => {
        try {
            const res = await getUpcomingSection.getUpcomingSection()
            getUpcomingFilmsData.value = res.data.results
            console.log(getUpcomingFilmsData.value)
            console.log(getUpcomingFilmsData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getUpcomingFilmsData, getUpcomingUl}

})