<script setup>
import {onMounted, ref,computed} from "vue";
import ThePosts from "../../components/Posts/ThePosts.vue";
import ModalInputData from '../../components/Posts/ModalInputData.vue'
import {usePostsStore} from '../../stores/PostsStore.js'

const postsStore = usePostsStore()
const postsData = computed(() => postsStore.getPostsData)

const reactiveBool = ref(true)
const setCurrentPostId = (id) => {
  localStorage.setItem("currentPost", id)
  console.log(localStorage.getItem("currentPost"))
}
onMounted(() => {postsStore.getPostsUl()
})
</script>

<template>
  <div class="w-full h-[50px] mt-[120px] relative flex-col justify-end items-end flex pr-[80px]">
    <div class="w-48 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer hover:duration-500 hover:transition-all hover:bg-blue-300">
      <button class="text-center text-stone-800 text-[20px] font-normal leading-normal hover:duration-500 hover:transition-all hover:text-[21px]" @click="reactiveBool = !reactiveBool"><span class="text-[25px] pr-[10px]">+</span> Create Post</button>
    </div>
    <ModalInputData v-show="!reactiveBool"
    />
  </div>
  <div class="flex flex-col justify-center items-center mx-[80px]">
  <ThePosts v-for="post in postsData" :key="post.index"
    :post="post"
  @click="setCurrentPostId(post._id)"/>
  </div>
</template>


<style scoped>

</style>