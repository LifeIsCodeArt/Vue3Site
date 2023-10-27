<script setup>
import {defineProps} from "vue";
const props = defineProps({
  comment: {
    type: Object,
    default: () => {}
  }
})
</script>

<template class="flex flex-col my-[60px]" >
    <div class="w-[780px] flex flex-col mb-12 bg-[#fceee9] rounded-3xl px-[50px] pt-[15px]" v-if="comment.commentAuthor">
        <div class="flex flex-col">
            <div class="flex items-center">
                <div class="w-auto text-[14px] font-bold" >{{comment.commentAuthor}}</div>
                <div class="ml-4 font-medium text-gray-400">{{comment._id}}</div>
            </div>


            <div class="my-[20px]">
                <div class="text-[18px] pl-4">{{comment.commentText}}</div>
            </div>
        </div>
      </div>
  <div class="w-[780px] flex flex-col mb-12 bg-[#c7d2fe] rounded-3xl px-[50px] pt-[15px]" v-else>
    <div class="flex flex-col">
      <div class="flex items-center">
        <div class="w-auto text-[12px] font-bold">Anonimus User</div>
        <div class="ml-4 font-medium text-[#fceee9]">User ID Hide</div>
      </div>


      <div class="my-[20px]">
        <div class="text-[18px] pl-4">{{comment.commentText}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

