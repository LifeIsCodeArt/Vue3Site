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
  <div class="flex flex-col mb-12 rounded-xl hover:bg-[#fceee9] hover:duration-1000 hover:transition-all">
    <img class="w-[403px] h-[300px] rounded-t-xl" :src="props.post.mainPicture" />
    <div class="w-[403.33px] h-[263px] p-6 flex-col justify-center items-start gap-6 inline-flex mb-12">
      <div class=" h-[167px] relative flex-col justify-start items-start flex">
        <div class="pr-[184.33px] justify-between items-center">
          <div class="w-full h-[29px] relative flex justify-between items-center flex">
            <div class="w-[170px] text-stone-800 text-[15px] font-bold mr-8">{{ props.post.mainTheme }}</div>
            <div class="w-[100px] text-stone-500 text-[14px] font-semibold leading-tight">May 10, 2022</div>
          </div>
        </div>
        <div class="w-[349px] text-stone-800 text-[24px] font-bold leading-loose roboto">{{props.post.mainArticle}}</div>
        <div class="w-[319px] h-[300] text-stone-500 text-[16px] font-normal  overflow-hidden overflow-ellipsis  mt-4 ">{{props.post.mainText}}</div>
      </div>
      <div class="self-stretch h-6 pr-[254.33px] justify-start items-start gap-1 inline-flex">
        <RouterLink to="current-post" class="w-[142px] h-[50px] hover:text-black text-white text-[16px] font-normal leading-normal mt-8 bg-[#4281a4] rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer hover:bg-yellow-200 hover:text-black hover:transition-all hover:duration-500">Read More</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>