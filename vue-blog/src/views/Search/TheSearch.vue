<script setup>
import {useMovieSearchStore,useTvSearchStore,useKeywordsSearchStore} from "@/stores/SearchStore.js";
import FoundedFilms from "@/components/Search/foundedFilms.vue";
import FoundedKeywords from "@/components/Search/foundedKeywords.vue";
import {computed, onMounted, ref} from "vue";

const searchMovieStore = useMovieSearchStore()
const searchTvStore = useTvSearchStore()
const searchKeywords = useKeywordsSearchStore()

const searchMovieStoreData = computed(() => searchMovieStore.getMovieSearchData)
const searchTvStoreData = computed(()=> searchTvStore.getTvSearchData)
const searchKeywordsData = computed(() => searchKeywords.getKeywordsSearchData)

const currentPage = ref(localStorage.getItem('currentPage'))

const activeSection = ref(1)
const setCurrentPostId = (id) => {
    localStorage.setItem("currentFilm", id)
    console.log(localStorage.getItem("currentFilm"))
}

const setCurrentActiveValue = (Number) =>{
    activeSection.value = Number
    localStorage.setItem('currentPage', '1')
    currentPage.value = localStorage.getItem('currentPage')
    if(Number === 1){
        searchMovieStore.getMovieSearchUl()
    }
    else if (Number === 2){
        searchTvStore.getTvSearchUl()
    }
    else if (Number === 3){
        searchKeywords.getKeywordsSearchUl()
    }
}

const nextPage = () =>{
    localStorage.setItem('currentPage', Number.parseInt(++currentPage.value, 10).toString())
    if (activeSection.value === 1){
        searchMovieStore.getMovieSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
    else if(activeSection.value === 2){
        searchTvStore.getTvSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
    else{
        searchKeywords.getKeywordsSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
}
const prevPage = () =>{
    localStorage.setItem('currentPage', Number.parseInt(--currentPage.value, 10).toString())
    if (activeSection.value === 1){
        searchMovieStore.getMovieSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
    else if(activeSection.value === 2){
        searchTvStore.getTvSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
    else{
        searchKeywords.getKeywordsSearchUl()
        console.log(localStorage.getItem('currentPage'))
    }
}



onMounted(()=>{
    localStorage.setItem('currentPage', '1')
    searchMovieStore.getMovieSearchUl()
    searchTvStore.getTvSearchUl()
    searchKeywords.getKeywordsSearchUl()
})

</script>

<template>
  <div class="w-full mt-[120px]">
      <input type="text" class="w-full h-[50px] border-b-2 px-[80px] text-gray-400 italic font-medium outline-none">
  </div>
  <div class="flex mb-80 mt-[10px]">
      <div class="w-[600px]">
          <div class="ml-[300px] mt-[30px] h-[198px] w-[260px] flex flex-col border-2 rounded-2xl">
              <div class="h-[65px] pl-[20px] w-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-xl flex justify-start items-center font-semibold text-white text-[18px]">Search Results</div>
              <ul class="mt-[10px]">
                  <li @click="setCurrentActiveValue(1)" class="flex justify-between items-center px-[20px] h-[40px]"  :class="{'disabled:cursor-not-allowed bg-gray-300  pointer-events-none  font-bold':activeSection === 1, 'hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 1}"><button class="">Movies</button>{{searchMovieStore.getMovieTotal}}</li>
                  <li @click="setCurrentActiveValue(2)" class="flex justify-between items-center px-[20px] h-[40px]"  :class="{'disabled:cursor-not-allowed bg-gray-300  pointer-events-none  font-bold':activeSection === 2, 'hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 2}"><button class="">TvShows</button>{{searchTvStore.getTvSearchTotal}}</li>
                  <li @click="setCurrentActiveValue(3)" class="flex justify-between items-center px-[20px] h-[40px] rounded-b-xl"  :class="{'disabled:cursor-not-allowed bg-gray-300  pointer-events-none  font-bold':activeSection === 3, 'hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 2}"><button class="">Keywords</button>{{searchKeywords.getTotalResultsData}}</li>
              </ul>
          </div>
      </div>
        <div class="flex flex-col" v-if="activeSection === 1">
          <FoundedFilms v-for="result in searchMovieStoreData" :key="result.index"
          :post="result"
          @click="setCurrentPostId(result.id)">

          </FoundedFilms>
        </div>

      <div class="flex flex-col" v-if="activeSection === 2">
          <FoundedFilms v-for="result in searchTvStoreData" :key="result.index"
                        :post="result"
                        @click="setCurrentPostId(result.id)">

          </FoundedFilms>
      </div>

      <div class="flex flex-col" v-if="activeSection === 3">
          <FoundedKeywords v-for="result in searchKeywordsData" :key="result.index"
                        :post="result"
                        @click="setCurrentPostId(result.id)">
          </FoundedKeywords>
      </div>
      </div>
    <div class="my-32 flex justify-center items-center ">
        <div v-if="activeSection === 1" class="w-[700px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>

            <button v-show="currentPage > 1" @click="prevPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{currentPage-1}}</button>
            <button class="border-2 p-2 mx-10 w-20 rounded disabled:cursor-not-allowed pointer-events-none bg-gray-300">{{currentPage}}</button>
            <button v-show="Number(currentPage)  < searchMovieStore.getMovieTotalPages" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{Number(currentPage) +1}}</button>

            <button v-show="currentPage < searchMovieStore.getMovieTotalPages" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{searchMovieStore.getMovieTotalPages}}</button>

            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === searchMovieStore.getMovieTotalPages}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
        <div v-else-if="activeSection === 2" class="w-[700px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>

            <button v-show="currentPage > 1" @click="prevPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{currentPage-1}}</button>
            <button class="border-2 p-2 mx-10 w-20 rounded disabled:cursor-not-allowed pointer-events-none bg-gray-300">{{currentPage}}</button>
            <button v-show="Number(currentPage)  < searchTvStore.getTvSearchTotalPages" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{Number(currentPage) +1}}</button>

            <button v-show="currentPage < searchTvStore.getTvSearchTotalPages" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{searchTvStore.getTvSearchTotalPages}}</button>

            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === searchTvStore.getTvSearchTotalPages}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
        <div v-else class="w-[500px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>

            <button v-show="currentPage > 1" @click="prevPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{currentPage-1}}</button>
            <button class="border-2 p-2 mx-10 w-20 rounded disabled:cursor-not-allowed pointer-events-none bg-gray-300">{{currentPage}}</button>
            <button v-show="Number(currentPage) +1  < searchKeywords.getTotalPagesData" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{Number(currentPage) +1}}</button>

            <button v-show="currentPage < searchKeywords.getTotalPagesData" @click="nextPage" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">{{searchKeywords.getTotalPagesData}}</button>

            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === searchKeywords.getTotalPagesData}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
    </div>
</template>


<style scoped>
</style>