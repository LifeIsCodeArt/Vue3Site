<script setup>
import {computed, onMounted, ref} from "vue";
import {usePostCommentsStore} from "../../stores/PostsStore.js";

import PostComments from "../../components/Posts/PostComments.vue";
import {toast} from "vue3-toastify";

const commentsStore = usePostCommentsStore()
const commentsStoreValue = computed(()=> commentsStore.getPostsCommentsData)

const post = ref({})
const currentComment = ref('')
const currentLikesNumber = ref(0)
const likeButton = ref(true)
const dislikeButton = ref(true)
const currentIdPost = localStorage.getItem('currentPost')
console.log(currentIdPost)

const sendProductsData = async () => {
  const res = await fetch(`http://localhost:3000/products/${currentIdPost}`)
  post.value = await res.json()
  post.value.mainText = post.value.mainText.replaceAll('\n', `<br>`)
  console.log(post.value.mainText)
  currentLikesNumber.value = post.value.likeMeter
}

const sendData = async (url, data) => {
  const response = await fetch(url, {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data,
  })
  console.log(response)
  if (!response.ok) {
    throw new Error(`Error with url ${url} and error code is ${response.status}`)
  }
  return await response.json()
}

const addComment = () => {
  if (!currentComment.value){
    toast.error(`Sorry, your comment will not be added, please try again`, {
      autoClose: 3000,
      delay: 2000,
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
  else {
    toast.success(`Your comment successfully added ${localStorage.getItem("userNickname")}`, {
      autoClose: 3000,
      delay: 2000,
      position: toast.POSITION.BOTTOM_RIGHT
    })
    const data = {
      "commentAuthor": localStorage.getItem('userNickname'),
      "commentText": currentComment.value
    }
    const comment = JSON.stringify(data)
    console.log(comment)
    console.log(data)
    sendData(`http://localhost:3000/products/${currentIdPost}/commentSection`, comment)
    currentComment.value = ''
  }
}

const toggleLike = (status) => {
  const data = {
    "likeMeter": currentLikesNumber.value + status
  }
  const cartList = JSON.stringify(data)
  console.log(cartList)
  console.log(data)
  sendData(`http://localhost:3000/products/${currentIdPost}`, cartList)
}

onMounted(() => {
  sendProductsData()
  commentsStore.getPostsCommentsUl()
})
</script>

<template class="bg-[#eefdee]">

  <div class="mx-[80px] h-full pt-[120px] text-left">
    <div class="mx-[360px]">
          <div class=" text-[40px] font-bold my-12" ref="articleName">{{ post.articleName }}</div>
          <div class="flex justify-center items-start"><img ref="mainPicture" class="w-[1000px] h-[600px] rounded-xl object-contain"
                                                         :src="post.mainPicture" alt="#"></div>

        <div class="flex flex-col justify-center items-center mt-[30px]">
          <div class=" roboto text-[20px]" ref="mainText" v-html="post.mainText"></div>
        </div>
        <div class="flex flex-col">
          <div class="text-black cardo font-bold text-[40px] my-12" ref="subArticleName1">{{ post.subArticleName1 }}
          </div>
          <img class="h-[600px] w-[1000px] my-12" :src="post.secondaryPicture" v-show="post.secondaryPicture"
              ref="secondaryPicture">
         <div class="roboto text-[20px] " ref="subArticleText1">
            {{ post.subArticleText1 }}
          </div>
        </div>
        <div class="flex flex-col">
          <div class="text-black cardo font-bold text-[40px] my-12" ref="subArticleName2">{{post.subArticleName2}}</div>
          <img :src="post.thirdPicture" v-show="post.thirdPicture" class="h-[600px] w-[1000px] my-12" ref="thirdPicture">
          <div class="roboto text-[20px]" ref="subArticleText2">
            {{ post.subArticleText2 }}
          </div>
        </div>
    </div>
    <div class="flex flex-col my-64">

      <label for="commentText" class="text-[40px] text-center font-bold my-16">Type your commentary here</label>
      <p class="mb-12">Comments <b>({{ commentsStoreValue.length}})</b></p>
      <PostComments v-if="commentsStoreValue.length" v-for="comment in commentsStoreValue" :key="comment.index"
                    :comment="comment">

      </PostComments>
      <div v-else class="font-bold text-[22px]">No commentary added yet</div>
      <div class="w-full flex-col justify-end items-end">
        <textarea v-model="currentComment" class="bg-gray-50 pl-4 pt-12 h-64 w-1/2 my-12 text-[20px] border-2"
                  placeholder="Type your comment here..."></textarea>
        <div class="flex items-end justify-center pr-40 relative">
          <div
              class=" h-[50px] bg-yellow-500 rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer hover:bg-blue-300 hover:transition-all hover:duration-500">
            <button class="w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal"
                    @click="addComment">Post
            </button>
          </div>
          <div class="absolute flex justify-between flex-col w-[400px] h-64 right-[400px] bottom-[120px]">
            <div class="text-[16px] my-4 text-center">
              If you enjoy this post, please, press the <b class="font-bold">Like button</b>
            </div>
            <div class="flex justify-around" v-if="likeButton && dislikeButton">
              <button @click="likeButton = !likeButton"
                      class="w-48 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal hover:transition-all hover:ease-in-out hover:duration-1000 hover:bg-lime-500">
                Like
              </button>
              <button @click="dislikeButton = !dislikeButton"
                      class="w-48 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal hover:transition-all hover:ease-in-out hover:duration-1000 hover:bg-red-500">
                Dislike
              </button>
            </div>
            <div class="flex flex-col justify-center items-center" v-else-if="!likeButton">
              <p class="my-4">Thanks for your activity!</p>
              <div class="flex">
                <button @click="likeButton = !likeButton"
                        class="w-24 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal bg-lime-500 hover:ease-in-out hover:transition-all hover:duration-1000 hover:bg-red-500">
                  Like
                </button>
                <button @click="toggleLike(1)"
                        class="w-24 ml-6 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal  hover:ease-in-out hover:transition-all hover:duration-1000 hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
            <div class="flex flex-col justify-center items-center" v-else-if="!dislikeButton">
              <p class="my-4">Thanks for your activity!</p>
              <div class="flex">
                <button @click="dislikeButton = !dislikeButton"
                        class="w-24 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal bg-red-500 hover:ease-in-out hover:transition-all hover:duration-1000 hover:bg-lime-500">
                  Dislike
                </button>
                <button @click="toggleLike(-1)"
                        class="w-24 ml-6 h-[50px] bg-white rounded-md shadow border border-stone-200 flex justify-center items-center cursor-pointer w-[142px] text-center text-stone-800 text-[16px] font-normal leading-normal  hover:ease-in-out hover:transition-all hover:duration-1000 hover:bg-gray-300">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.roboto {
  font-family: 'Roboto', sans-serif;
}

.cardo {
  font-family: 'Cardo', serif;
}
</style>