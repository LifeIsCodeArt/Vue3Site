<script setup>
import {usePersonImagesStore,usePersonDetailsStore,usePersonCombinedCreditsStore} from "@/stores/PersonStore.js";
import {computed, onMounted, ref} from "vue";

const personImagesStore = usePersonImagesStore()
const personDetailsStore = usePersonDetailsStore()
const personPersonCombinedCreditsStore = usePersonCombinedCreditsStore()

const personCombinedCreditsData = computed(()=> personPersonCombinedCreditsStore.getPersonCombinedCreditsData)
const personImagesStoreData = computed(()=> personImagesStore.getPersonImagesData)
const personDetailsStoreData = computed(()=> personDetailsStore.getPersonDetailsData)
const personDetailsStoreBiographyData = computed(()=> personDetailsStore.getPersonDetailsBiographyData)
const personCastCredits = computed(() => personPersonCombinedCreditsStore.getPersonCastCreditsData)
const personCrewCredits = computed(() => personPersonCombinedCreditsStore.getPersonCrewCreditsData)
const personCastCrewHighestYear = ref(2023)

const changeCurrentHighestYear = (value) =>{
  personCastCrewHighestYear.value = value
  console.log(personCastCrewHighestYear.value)
}

console.log(personCastCrewHighestYear)
console.log(personCastCredits)
const setCurrentPostId = (id) => {
  localStorage.setItem("currentFilm", id)
  console.log(localStorage.getItem("currentFilm"))
}


onMounted(()=>{
    personImagesStore.getPersonImagesUl()
    personDetailsStore.getPersonDetailsUl()
  personPersonCombinedCreditsStore.getPersonCombinedCreditsUl()
})
</script>

<template>
<div class="mt-[120px] mx-[80px] flex ml-[300px]">
    <div class="flex flex-col items-start w-[300px] rounded-t-xl">
        <div class="rounded-xl"><img :src="'https://www.themoviedb.org/t/p/w300_and_h450_bestv2' + personImagesStoreData.file_path" :height="personImagesStoreData.height" :width="personImagesStoreData.width" alt="" class="rounded-xl"></div>
        <div class="flex flex-col mt-[30px]">
            <h2 class="font-bold text-[20px]">Personal Info</h2>
            <ul class="">
                <li class="flex flex-col mb-[30px]">
                    <h3 class="mt-[10px] font-bold">Known For</h3>
                    <p class="font-medium">{{personDetailsStoreData.known_for_department}}</p>
                </li>
                <li class="flex flex-col mb-[30px]">
                    <h3 class="mb-[10px] font-bold">Known Credits</h3>
                    <p class="font-medium"></p>
                </li>
                <li class="flex flex-col  mb-[30px]">
                    <h3 class="font-bold">Gender</h3>
                    <p v-if="personDetailsStoreData.gender === 2" class="font-medium">Male</p>
                    <p v-else-if="personDetailsStoreData.gender === 1" class="font-medium">Female</p>
                    <p v-else class="font-medium">Unknown</p>
                </li>
                <li class="flex flex-col  mb-[30px]">
                    <h3 class="font-bold">Birthday</h3>
                    <p v-if="personDetailsStoreData.birthday !== null" class="font-medium">{{personDetailsStoreData.birthday}}</p>
                    <p v-else class="">-</p>
                </li>

                <li v-if="personDetailsStoreData.deathday !== null" class="flex flex-col  mb-[30px]">
                    <h3 class="font-bold">Day of Death</h3>
                    <p class="font-medium">{{personDetailsStoreData.deathday}}</p>
                </li>


                <li class="flex flex-col  mb-[30px]">
                    <h3 class="mb-[10px] font-bold">Place of Birth</h3>
                    <p v-if="personDetailsStoreData.place_of_birth !== null" class="font-medium">{{personDetailsStoreData.place_of_birth}}</p>
                    <p v-else class="">-</p>
                </li>
                <li class="flex flex-col  mb-[30px]">
                    <h3 class="mb-[10px] font-bold">Also Known As</h3>
                    <p v-if="personDetailsStoreData.also_known_as <1" class="font-medium"> - </p>
                    <p v-else class="pb-[15px] font-medium" v-for="item in personDetailsStoreData.also_known_as" :key="item.index"> {{item}} </p>
                </li>
            </ul>
        </div>
        <div class="">Content Score</div>
    </div>
    <div class="flex flex-col w-[900px] ml-[30px]">
        <div class="mb-[50px]  font-bold text-[37px]">{{personDetailsStoreData.name}}</div>
        <div class="h-auto  font-semibold"> <p class="pb-[15px] font-bold text-[20px]">Biography</p><div class="" v-html="personDetailsStoreBiographyData"></div></div>
        <div class="mt-[40px]">
            <div class="flex">
                <div class="flex w-[1620px] flex-wrap">
                  <RouterLink @click="setCurrentPostId(item.id)" to="/current-film" class="h-[295px] w-[130px] mr-[15px] flex flex-col"  v-for="item in personCombinedCreditsData" :key="item.index">
                        <img class="rounded-xl" :src="'https://www.themoviedb.org/t/p/w150_and_h225_bestv2'+ item.poster_path">
                        <div class="text-center font-semibold text-[11px] hover:text-blue-400 hover:transition-all " v-if="item.title !== undefined">{{item.title}}</div>
                        <div class="text-center font-semibold text-[11px] hover:text-blue-400 hover:transition-all" v-else>{{item.name}}</div>
                    </RouterLink>
                </div>
            </div>
        </div>
      <div class="font-bold text-[22px]">Acting</div>
        <ul class="mt-[30px] border-2 border-gray-300 mb-64 shadow-xl">
          <li class="w-full flex h-[80px]" v-for="item in personCastCredits" :key="item.index">
             <div class="w-full flex border-t-2"  v-if="item.release_date < personCastCrewHighestYear">
                <div @change='changeCurrentHighestYear(item.release_date)' class="flex items-center  mr-[25px] border-gray-300">
                  <p class="mx-[15px] font-medium text-[15px]">{{item.release_date}}</p>
                  <input type="radio" class="accent-black">
                </div>
                <div class="flex justify-center flex-col pt-5">
                  <RouterLink to="/current-film" @click="setCurrentPostId(item.id)" v-if="item.title"><p class="font-bold">{{item.title}}</p></RouterLink>
                  <RouterLink to="/current-film" @click="setCurrentPostId(item.id)"  v-else><p class="font-bold">{{item.name}}</p></RouterLink>
                  <p class="ml-[15px]"> as {{item.character}}</p>
                </div>
             </div>
            <div v-else class="w-full flex ">
              <div class="flex items-center justify-center mr-[25px] border-gray-300">
                <p class="mx-[15px] font-semibold">{{item.release_date}}</p>
                <input type="radio" class="accent-black">
              </div>
              <div class="flex justify-center flex-col">
                <RouterLink to="/current-film" @click="setCurrentPostId(item.id)" v-if="item.title"><p class="font-bold">{{item.title}}</p></RouterLink>
                <p class="ml-[15px]"> as {{item.character}}</p>
              </div>
            </div>
          </li>
        </ul>
      <div v-show="personCrewCredits.length >1" class="">
          <div class="font-bold text-[22px]">Production</div>
          <ul class="mt-[30px] border-2 border-gray-300 mb-96 shadow-xl">
            <li class="w-full flex h-[80px]" v-for="item in personCrewCredits" :key="item.index">
              <div class="w-full flex border-t-2"  v-if="item.release_date < personCastCrewHighestYear">
                <div @change='changeCurrentHighestYear(item.release_date)' class="flex items-center justify-center mr-[25px] border-gray-300">
                  <p class="mx-[15px] font-semibold">{{item.release_date}}</p>
                  <input type="radio" class="accent-black">
                </div>
                <div class="flex justify-center flex-col">
                  <p class="" v-if="item.title">{{item.title}}</p>
                  <p class="" v-else>{{item.name}}</p>
                  <p class="ml-[15px]"> as {{item.job}}</p>
                </div>
              </div>
              <div v-else class="w-full flex ">
                <div class="flex items-center justify-center mr-[25px] border-gray-300">
                  <p class="mx-[15px] font-semibold">{{item.release_date}}</p>
                  <input type="radio" class="accent-black">
                </div>
                <div class="flex justify-center flex-col">
                  <p class="" v-if="item.title">{{item.title}}</p>
                  <p class="" v-else>{{item.name}}</p>
                  <p class="ml-[15px]"> as {{item.job}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
    </div>
</div>
</template>

<style scoped>

</style>