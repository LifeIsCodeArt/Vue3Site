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
  <div class="h-auto px-[20px] py-[20px] rounded-xl w-[1020px] flex-col my-[30px] bg-[#fceee9]">
      <div class="flex">
          <div  v-if='props.post.avatar_path === null' class=""><img src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg' alt="" class=""></div>
          <div v-else class="rounded-xl mr-[15px]"><img :src="'https://www.themoviedb.org/t/p/w45_and_h45_face' + props.post.author_details.avatar_path" alt="" class="rounded-3xl"></div>

          <div class="flex flex-col">
              <a class="font-bold">A review By {{props.post.author}}</a>
              <div class="">
                  {{props.post.author_details.rating}} Written by {{props.post.author}} on {{props.post.created_at}}
              </div>
          </div>
      </div>
      <div class="mt-[30px]">
          {{props.post.content}}
      </div>
  </div>
</template>

<style scoped>

</style>