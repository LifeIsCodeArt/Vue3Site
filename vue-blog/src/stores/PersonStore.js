import {ref} from 'vue'
import {defineStore} from 'pinia'
import getCurrentPersonCombinedCredits from "@/services/api/getCurrentPersonCombinedCredits.js";
import getCurrentPersonDetails from "@/services/api/getCurrentPersonDetails.js";
import getCurrentPersonImages from "@/services/api/getCurrentPersonImages.js";

export const usePersonCombinedCreditsStore = defineStore('personCombinedCredits', () => {
    const getPersonCombinedCreditsData = ref([])
    const getPersonCastCreditsData = ref([])
    const getPersonCrewCreditsData = ref([])
    const getPersonCombinedCreditsUl = async () => {
        try {
            const res = await getCurrentPersonCombinedCredits.getCombinedCreditsSection()

            getPersonCastCreditsData.value = res.data.cast.map((element) =>{if(element.release_date){return  {...element, release_date: new Date(element.release_date).getFullYear()}}
            else {return  {...element, release_date: new Date(element.first_air_date).getFullYear()}}
            })
            getPersonCastCreditsData.value.sort((a,b)=>(b.release_date - a.release_date))

            if(res.data.crew.length){
                getPersonCrewCreditsData.value = res.data.crew.map((element) =>{if(element.release_date){return  {...element, release_date: new Date(element.release_date).getFullYear()}}
                else {return  {...element, release_date: new Date(element.first_air_date).getFullYear()}}
                })
                getPersonCrewCreditsData.value.sort((a,b)=>(b.release_date - a.release_date))
            }

            if(res.data.cast.length<10){
                getPersonCombinedCreditsData.value = res.data.cast
                console.log(getPersonCombinedCreditsData.value)
                console.log(res.data.cast)
            }
            else{
                for(let i = 0; i<6;i++)
                    getPersonCombinedCreditsData.value.push(res.data.cast[i])
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return {getPersonCombinedCreditsData, getPersonCombinedCreditsUl,getPersonCastCreditsData,getPersonCrewCreditsData}

})

export const usePersonDetailsStore = defineStore('personDetails', () => {
    const getPersonDetailsData = ref([])
    const getPersonDetailsBiographyData = ref()
    const getPersonDetailsUl = async () => {
        try {
            const res = await getCurrentPersonDetails.getPersonDetailsSection()
            getPersonDetailsData.value = res.data
            if(res.data.biography.trim() !== ''){
                getPersonDetailsBiographyData.value = res.data.biography.replaceAll('\n', `<br>`)
                console.log(getPersonDetailsData.value)
            }
            else{
                getPersonDetailsBiographyData.value = `We don\'t have a biography for ${res.data.name}`
            }

        }
        catch (err) {
            console.log(err)
        }
    }

    return {
        getPersonDetailsData,
        getPersonDetailsBiographyData,
        getPersonDetailsUl
    }

})

export const usePersonImagesStore = defineStore('personImages', () => {
    const getPersonImagesData = ref([])
    const getPersonImagesUl = async () => {
        try {
            const res = await getCurrentPersonImages.getPersonImagesSection()
            getPersonImagesData.value = res.data.profiles[0]
            console.log(getPersonImagesData.value)

        }
        catch (err) {
            console.log(err)
        }
    }

    return {getPersonImagesData, getPersonImagesUl}

})