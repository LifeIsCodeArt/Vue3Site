<script setup>
import {defineProps, onMounted, ref} from "vue";
const props = defineProps({
    post: {
        type: Object,
        default: () => {}
    },

})
const randomColor = ref('')
function random_bg_color() {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  const bgColor = "rgb(" + x + "," + y + "," + z + ")";
  randomColor.value = bgColor
  console.log(bgColor);


}
// :style="{backgroundColor:randomColor}"
random_bg_color();
</script>

<template>


    <div ref="mainDiv" :class="{'first:flex flex-col mb-12 rounded-xl hover:bg-[#fceee9] hover:duration-1000 hover:transition-all':props.post.id % 2 === 0,
                  'second: flex flex-col mb-12 rounded-xl hover:bg-[#c7d2fe] hover:duration-1000 hover:transition-all':props.post.id % 2 !== 0}">
        <img class="w-[400px] h-[600px] rounded-t-xl object-cover" :src="'https://www.themoviedb.org/t/p/w600_and_h900_bestv2' + props.post.poster_path" />
        <div class="w-[400px] h-[263px] p-6 flex-col justify-center items-start gap-6 inline-flex mb-12">
            <div class=" h-[167px] relative flex-col justify-start items-start flex">
                <div class="pr-[184.33px] justify-between items-center">
                    <div class="w-full h-[29px] relative  justify-between items-center flex">
                        <div class="w-[220px] text-stone-800 text-[15px] font-bold mr-8  leading-tight">{{ props.post.original_title }}</div>
                        <div class="w-[150px] text-stone-500 text-[14px] font-normal leading-tight"><p class="font-bold text-black">Release:</p> {{props.post.release_date}}</div>
                    </div>
                </div>
                <div v-if="props.post.vote_average > 7" class="w-[349px]  text-[24px]  font-bold leading-loose roboto">Average user score: <span class="text-green-500">{{props.post.vote_average}}</span></div>
                <div v-else-if="props.post.vote_average < 7 && props.post.vote_average > 5" class="w-[349px] text-[24px] font-bold leading-loose roboto">Average user score: <span class="text-yellow-500"> {{props.post.vote_average}}</span></div>
              <div v-else class="w-[349px] text-[26px] font-bold leading-loose roboto">Average user score:<span class="text-yellow-500">{{props.post.vote_average}}</span></div>
                <div class="w-[359px] text-stone-500 text-[12px] font-normal overflow-y-hidden  leading-normal mt-4 roboto ">{{props.post.overview}}</div>
            </div>
            <div class="self-stretch h-6 pr-[254.33px] justify-start items-start gap-1 inline-flex">
                <RouterLink to="current-film" :class="{'first: hover:bg-[#ffa891] hover:duration-1000 hover:transition-all':props.post.id % 2 === 0,
                  'second: hover:bg-[#7cabf8] hover:duration-1000 hover:transition-all':props.post.id % 2 !== 0}" class="w-48 h-[50px] mt-8 bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer"><a class="w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal">Watch Now</a></RouterLink>
            </div>
        </div>
    </div>
</template>


<style scoped>
.roboto{
  font-family: 'Roboto', sans-serif;
}
.cardo{
  font-family: 'Cardo', serif;
}
</style>