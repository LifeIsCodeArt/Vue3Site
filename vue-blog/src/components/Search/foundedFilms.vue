<script setup>
import {defineProps} from "vue";
const props = defineProps({
    post: {
        type: Object,
        default: () => {}
    }
})
</script>

<template>
  <div class="w-[1020px] h-[143px] flex border-2 rounded-xl mt-[30px] shadow-2xl">
      <div class="w-[95px] h-[140px]">
          <RouterLink to="current-film"><img :src="'https://www.themoviedb.org/t/p/w94_and_h141_bestv2'+ props.post.poster_path" alt="" class="w-[95px] h-[140px] rounded-l-xl"></RouterLink>
      </div>
      <div class="pl-[20px] pr-[25px] pt-[25px] pb-[25px]">
          <div class="flex flex-col mb-[10px]">

              <div class="" v-if="props.post.original_title !== undefined"><RouterLink to="current-film" class="hover:text-gray-300 font-bold">{{props.post.original_title}}</RouterLink></div>
              <div class="" v-else><RouterLink to="current-film" class="hover:text-gray-300 font-bold">{{props.post.name}}</RouterLink></div>

              <div v-if="props.post.release_date !== undefined" class="">{{props.post.release_date}}</div>
              <div v-else class="">{{props.post.first_air_date}}</div>

          </div>
          <div class="overflow-ellipsis overflow-hidden whitespace-nowrap font-semibold  text-[15px] w-[880px]">{{props.post.overview}}</div>
      </div>
  </div>
</template>

<style scoped>

</style>