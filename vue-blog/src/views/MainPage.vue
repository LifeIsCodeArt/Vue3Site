<script setup>
import {onMounted, ref, computed} from "vue";
import PostMainPage from "../components/Posts/PostsMainPage.vue"
import {usePostsStore} from '../stores/PostsStore.js'
const postStore = usePostsStore()
const postsData = computed(() => postStore.getPostsData)
let currentPostId = ref(null)

  const setCurrentPostId = (id) => {
  localStorage.setItem("currentPost", id)
    console.log(localStorage.getItem("currentPost"))
}
onMounted(() => {
  postStore.getPostsUl()
})

</script>

<template>
  <section class="mx-[80px] mt-60">
    <div class="flex justify-between h-[180px]">
      <div class="flex flex-col">
        <div class="w-[53px] h-[29px] bg-stone-200 rounded-[32px] flex justify-center items-center">Blog</div>
        <div class="text-stone-800 text-[48px] font-bold leading-10 my-[29px]">Latest posts</div>
        <div class="text-stone-500 text-[18px] font-normal leading-relaxed">Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. <br>Praesent efficitur nibh massa morbi sagittis ornare dui in ornare.</div>
      </div>
      <div class="flex justify-end items-end">
        <RouterLink to="/blog-pages" v-if="postStore !== ''"><button class="w-[108px] h-[50px] bg-white rounded-md shadow border border-stone-200" title="This button enable only for authorized users">View all Enable</button></RouterLink>
        <RouterLink to="/blog-pages" v-else><button class="w-[108px] h-[50px] bg-white rounded-md shadow border border-stone-200 disabled:cursor-not-allowed" disabled  title="This button enable only for authorized users">View all Disable</button></RouterLink>

      </div>
    </div>
        <div class="flex justify-between items-center flex-wrap mt-[80px]">
         <PostMainPage v-for="post in postsData" :key="post.index"
         ref="currentPostId"
         :post="post"
         @click="setCurrentPostId(post._id)"
         />
        </div>
  </section>
</template>


<style>
.roboto{
  font-family: 'Roboto', sans-serif;
}
.cardo{
  font-family: 'Cardo', serif;
}
.disable{
  cursor: not-allowed;
}
</style>