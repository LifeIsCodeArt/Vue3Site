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
    <div class="w-[1480px] h-[600px] justify-center items-center gap-20  flex my-48">
      <div class="w-[800px] h-[600px] bg-contain">
      <img class="w-full h-full rounded-2xl"  :src="props.post.mainPicture" />
      </div>
      <div class="w-[600px] h-[489.83px] relative flex-col justify-start items-start flex">
        <div class="w-[127px] h-[29px] relative">
          <div class="w-[180px] h-[29px] left-0 top-0 absolute bg-stone-200 rounded-[32px]"></div>
          <div class="w-[180px]  top-[4px] absolute text-stone-800 text-[14px] font-normal leading-tight flex justify-center items-center mb-[32px]">
            {{ props.post.mainTheme }}</div>
        </div>
        <div class="w-[485px] text-stone-800 text-[48px] font-bold leading-10 my-[34px]">{{ props.post.mainArticle }}</div>
        <div class="flex flex-col justify-between">
          <div class="w-[600px] h-[340px] text-stone-500 text-[16px] font-normal  overflow-hidden overflow-ellipsis mb-[90px]">{{ props.post.mainText }}</div>
          <div class="">
            <div class="w-48 h-[50px] flex flex-col justify-start">
              <RouterLink to="current-post" class="h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer"><a class="w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal">Read More</a></RouterLink>
           </div>
          </div>
        </div>
      </div>
    </div>

</template>


<style scoped>

</style>