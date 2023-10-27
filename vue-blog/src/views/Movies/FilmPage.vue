<script setup>

import {useCurrentFilmStore, useKeywordsStore,useCreditsStore,useBackgroundStore,useReviewsStore} from '../../stores/FilmStore.js'
import CurrentFilmKeywords from "../../components/Movies/FilmKeywords.vue";
import CurrentFilmCredits from "../../components/Movies/FilmCredits.vue";
import CurrentFilmReviews from "../../components/Movies/FilmReviews.vue";

import {computed, onMounted} from "vue";

const currentFilmStore = useCurrentFilmStore()
const keywordsStore = useKeywordsStore()
const creditsStore = useCreditsStore()
const imagesStore = useBackgroundStore()
const reviewsStore = useReviewsStore()


const postsData = computed(() => currentFilmStore.getCurrentFilmData)
const currentKeywords = computed(()=>keywordsStore.getKeywordsData)
const currentCredits = computed(()=>creditsStore.getCreditsData)
const currentImages = computed(()=>imagesStore.getImagesData)
const currentReviews = computed(()=>reviewsStore.getReviewsData)
const currentCreditsValue = computed(()=>creditsStore.getCreditsCrew)

const setCurrentCharacterId = (id) => {
    localStorage.setItem("currentCharacter", id)
}

onMounted(() => {
    currentFilmStore.getCurrentFilmUl()
    keywordsStore.getKeywordsUl()
    creditsStore.getCreditsUl()
    imagesStore.getImagesUl()
    reviewsStore.getReviewsUl()
})
</script>

<template>
<div class="mx-[80px] mt-[120px] relative">
      <div class="h-[510px] bg-gradient-to-l from-pink-500 via-red-500 to-yellow-500 z-0">
          <div class=" opacity-20">
              <img :src="'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces' + currentImages.file_path" alt=""  height="510" class="w-[1920px] h-[510px]">
          </div>
      </div>
</div>
    <div class="mx-[300px] flex justify-start items-center absolute top-[150px] z-10 rounded">
        <img :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/' + postsData.poster_path" alt="1" class="h-[450px] w-[300px] mr-[40px] rounded-xl">
        
        <div class="z-10 text-white">
            <div class="text-[30px]"> <span class="font-semibold">{{postsData.original_title}}</span></div>
            <div class="flex">
                <div class="pr-2"> R {{postsData.release_date}} (UA) </div>
                <div class="flex justify-around w-50" v-for="item in postsData.genres" :key="item.index">{{ item.name }},</div>
                <div class="ml-2">{{postsData.runtime}}m </div>
            </div>
            <div class=""></div>
            <div class="italic">{{ postsData.tagline }}</div>
            <div class="">
                <h1 class="my-[20px]">Overview</h1>
                {{postsData.overview}}
            </div>
            <div class="flex mt-[30px]">
                <div class="mr-[205px]" v-for="item in currentCreditsValue" :key="item.index">
                        <p class="font-bold">{{item.name}}</p>
                        <p class="">{{item.job}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="flex mb-32 mt-[60px]">
        <div class="w-[1450px] h-auto flex flex-wrap ml-[80px]">
            <CurrentFilmCredits v-for="item in currentCredits.cast" :key="item.index"
                                :credit="item"
                                @click='setCurrentCharacterId(item.id)'> </CurrentFilmCredits>
        </div>

        <div class="flex flex-col">
            <ul class="w-[150px] flex flex-col">
                <li class="mb-[30px]">
                    <span class="font-bold">Status<br></span>
                    {{postsData.status}}
                </li>
                <li class="mb-[30px]">
                    <span class="font-bold">Original Language<br></span>
                    {{postsData.original_language}}
                </li>
                <li class="mb-[30px]">
                    <span class="font-bold">Budget<br></span>
                    ${{postsData.budget}}
                </li>
                <li class="mb-[30px]">
                    <span class="font-bold">Revenue<br></span>
                    ${{postsData.revenue}}
                </li>
            </ul>
            <div class="flex flex-col h-auto w-[210px] overflow-ellipsis whitespace-nowrap">
                <h2 class="font-bold text-left mb-4 ml-[5px]">Keywords</h2>
                <CurrentFilmKeywords v-if="currentKeywords.length" v-for="item in currentKeywords" :key="item.index"

                :post="item">
                </CurrentFilmKeywords>
                <div v-else class="">No keywords have been added.</div>
            </div>
        </div>
    </div>
    <div class="mb-96 mx-[80px] flex flex-col">
        <div class="flex items-end">
            <h2 class="font-bold text-[22px] mr-5">Social</h2>
            <h2 class="font-bold text-[18px]">Reviews {{currentReviews.total_results}}</h2>
        </div>

        <CurrentFilmReviews v-for="post in currentReviews.results" :key="post.index"
        :post="post">

        </CurrentFilmReviews>
    </div>
</template>

<style scoped>
  .background{
      background-image: url("https://the-riotact.com/wp-content/uploads/2019/02/pickture-festival-jpg-1920x651-1.jpg");
      background-size: cover;
  }
</style>