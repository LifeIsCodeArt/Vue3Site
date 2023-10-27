<script setup>
    import {useDiscoverStore,useTopRatedStore,useUpcomingStore} from '../../stores/FilmCollectionsStore.js'
    import DiscoverFilms from "@/components/Movies/DiscoverFilms.vue";
    import {computed, onMounted, ref} from "vue";

    const discoverStore = useDiscoverStore()
    const upcomingStore = useUpcomingStore()
    const topRatedStore = useTopRatedStore()

    const currentPage = ref(localStorage.getItem('currentPage'))
    const searchWordData = ref('')

    const postsData = computed(() => discoverStore.getDiscoverData)
    const currentUpcoming = computed(()=>upcomingStore.getUpcomingFilmsData)
    const currentTopRated = computed(()=>topRatedStore.getTopRatedFilmsData)


    const activeSection = ref(1)

    const setCurrentActiveValue = (Number) =>{
        activeSection.value = Number
        localStorage.setItem('currentPage', '1')
        currentPage.value = localStorage.getItem('currentPage')
        if (Number === 1){
            discoverStore.getDiscoverUl()
        }
        else if (Number === 2){
            upcomingStore.getUpcomingUl()
        }
        else {
            topRatedStore.getTopRatedUl()
        }
    }

    const nextPage = () =>{
        localStorage.setItem('currentPage', Number.parseInt(++currentPage.value, 10).toString())
        if (activeSection.value === 1){
            discoverStore.getDiscoverUl()
            console.log(localStorage.getItem('currentPage'))
        }
        else if(activeSection.value === 2){
            topRatedStore.getTopRatedUl()
            console.log(localStorage.getItem('currentPage'))
        }
        else{
            upcomingStore.getUpcomingUl()
            console.log(localStorage.getItem('currentPage'))
        }
    }
    const prevPage = () =>{
        localStorage.setItem('currentPage', Number.parseInt(--currentPage.value, 10).toString())
        if (activeSection.value === 1){
            discoverStore.getDiscoverUl()
            console.log(localStorage.getItem('currentPage'))
        }
        else if(activeSection.value === 2){
            topRatedStore.getTopRatedUl()
            console.log(localStorage.getItem('currentPage'))
        }
        else{
            upcomingStore.getUpcomingUl()
            console.log(localStorage.getItem('currentPage'))
        }
    }

    const setCurrentPostId = (id) => {
        localStorage.setItem("currentFilm", id)
        console.log(localStorage.getItem("currentFilm"))
    }

    const setCurrentSearchReq = () => {
        localStorage.setItem("currentSearchReq", searchWordData.value)
        console.log(localStorage.getItem("currentSearchReq"))
    }

    onMounted(() => {
        localStorage.setItem('currentPage', '1')
        localStorage.setItem("currentSearchReq", '')
        discoverStore.getDiscoverUl()
        upcomingStore.getUpcomingUl()
        topRatedStore.getTopRatedUl()
    })
</script>

<template>
    <div class="flex justify-center my-[50px] mt-[120px]">
        <ul class="mx-[80px] flex">
            <li  @click="setCurrentActiveValue(1)"  :class="{'disabled:cursor-not-allowed  pointer-events-none border-b-2 pb-2 border-b-blue-400':activeSection === 1, 'hover:border-b-2 hover:border-b-gray-400 hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 1}"><button class="font-bold text-[12px]" :class="{'disabled:cursor-not-allowed':activeSection === 1}">Popular</button></li>
            <li  @click="setCurrentActiveValue(2)"  class='mx-[30px]' :class="{'disabled:cursor-not-allowed  pointer-events-none border-b-2 pb-2 border-b-blue-400':activeSection === 2, 'hover:border-b-2 hover:border-b-gray-400  hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 2}"><button class="font-bold text-[12px]" :class="{'disabled:cursor-not-allowed':activeSection === 2}">Top Rated</button></li>
            <li  @click="setCurrentActiveValue(3)"  :class="{'disabled:cursor-not-allowed  pointer-events-none border-b-2 pb-2 border-b-blue-400':activeSection === 3, 'hover:border-b-2 hover:border-b-gray-400  hover:rounded hover:ease-out hover:transition-all hover:duration-500': activeSection !== 3}"><button class="font-bold text-[12px]" :class="{'disabled:cursor-not-allowed':activeSection === 3}">Upcoming</button></li>
        </ul>
    </div>
    <div class="flex justify-center">
        <div class="mx-[80px] w-[1300px] h-[400px] relative">
            <img src="../../components/icons/SuperMario2.avif" alt="" class="flex justify-center w-[1300px] h-[400px]">
            <div class="absolute w-[1300px] h-[400px] bg-gradient-to-r from-blue-800 to-indigo-900 opacity-80 top-0"></div>
        </div>
        <div class="absolute w-[1300px] h-[400px] px-[40px] flex flex-col justify-center">
            <div class="">
                <h1 class="text-white text-[42px] font-bold cardo">
                    Welcome.
                </h1>
                <p class="text-white text-[25px] cardo">
                    Millions of movies, TV shows and people to discover. Explore now.
                </p>
            </div>

            <div class="mt-[60px]">
                <input ref="searchWord" v-model="searchWordData" type="text" placeholder="Search for a movie, tv show, person..." class="cardo w-full h-[50px] rounded-3xl pl-[22px] relative">
                <RouterLink @click="setCurrentSearchReq" to="search-film" class="rounded-3xl absolute right-10 bottom-[95px] text-white w-[120px] hover:text-black bg-gradient-to-r from-cyan-500 to-blue-500 h-[50px] flex justify-center items-center font-bold">Search</RouterLink>
            </div>
        </div>
    </div>
    <div class="">

    </div>
    <div class="flex justify-between items-center flex-wrap mx-[80px] mt-[80px]" v-if="activeSection === 3">
        <DiscoverFilms v-for="post in currentUpcoming" :key="post.index"
                       ref="currentPostId"
                       :post="post"
                       @click="setCurrentPostId(post.id)"
        />
    </div>
    <div class="flex justify-between items-center flex-wrap mx-[80px] mt-[80px]" v-else-if="activeSection === 2">
        <DiscoverFilms v-for="post in currentTopRated" :key="post.index"
                       ref="currentPostId"
                       :post="post"
                       @click="setCurrentPostId(post.id)"
        />
    </div>
    <div class="flex justify-between items-center flex-wrap mx-[80px] mt-[80px]" v-else>
        <DiscoverFilms v-for="post in postsData" :key="post.index"
                       ref="currentPostId"
                       :post="post"
                       @click="setCurrentPostId(post.id)"
        />
    </div>

    <div class="my-32 flex justify-center items-center ">
        <div v-if="activeSection === 1" class="flex justify-around w-[300px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>
            <button class="">{{currentPage}}</button>
            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === postsData.total_pages}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
        <div v-else-if="activeSection === 2" class="flex justify-around w-[300px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>
            <button class="">{{currentPage}}</button>
            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === currentTopRated.total_pages}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
        <div v-else class="flex justify-around w-[300px]">
            <button @click="prevPage" :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage <= '1'}" class="p-2 w-20 rounded hover:bg-blue-300 hover:transition-all hover:duration-500">Previous</button>
            <button class="">{{currentPage}}</button>
            <button @click='nextPage' :class="{'disabled:cursor-not-allowed pointer-events-none bg-gray-300':currentPage === currentUpcoming.total_pages}" class="p-2 w-20 rounded hover:bg-yellow-300 hover:transition-all hover:duration-500">Next</button>
        </div>
    </div>
</template>

<style>
    .disable{
        cursor: not-allowed;
    }
    .roboto{
      font-family: 'Roboto', sans-serif;
    }
    .cardo{
      font-family: 'Cardo', serif;
    }
</style>