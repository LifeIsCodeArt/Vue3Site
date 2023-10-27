<script setup>
import {ref} from "vue";
import 'vue3-toastify/dist/index.css'
import { toast, globalOptions } from 'vue3-toastify'
import axios from "axios";

 const modalInputWindow = ref(null)

  const postArticle = ref("")
  const postTextArea = ref("")
  const postSubArticleFirst = ref("")
  const postTextAreaFirst = ref("")
  const postSubArticleSecond = ref("")
  const postTextAreaSecond = ref("")
  const postLinkImage = ref("")
  const mainTheme = ref("")
  const secondaryPostLinkImage = ref('')
  const thirdPostLinkImage = ref('')

  const getResourse = async (url) =>{
   const responce = await fetch(url)
    console.log(responce)
    if(!responce.ok){
      throw  new Error(`Error with url ${url} and error code is ${responce.status}`)
    }
    return  await responce.json()
  }
  getResourse('http://localhost:3000/users/').then((data) => console.log(data))


let createPost = async () => { await  axios.post('http://localhost:3000/products', {
      articleName: postArticle.value,
      mainText: postTextArea.value,
      mainPicture: postLinkImage.value,
      mainTheme: mainTheme.value,
  }
)
  modalInputWindow.value.style.display = 'none'
   toast.success(`Post successfully created, please refresh page`,{
     autoClose: 3000,
     position: toast.POSITION.TOP_LEFT
   })}
</script>
<template>
  <div ref="modalInputWindow" class="flex justify-center items-center bg-[rgba(0,0,0,.56)] z-10 h-[2400px] w-full absolute top-[-100px] left-0">
    <div class="h-auto w-[600px] bg-white py-8 px-8 z-10 border border-gray-500 flex flex-col relative">
      <h1 class="flex justify-center mb-5 roboto font-bold text-[22px]">Post Creation</h1>
      <div class="absolute text-gray-500 text-[18px] font-bold right-6 top-[20px] cursor-pointer" @click="modalInputWindow.style.display = 'none'">Х</div>
      <div class="mt-20">
        <input v-model="postArticle"  type="text" class="w-full  border-b-2 border-b-gray-400 text-[16px] mb-12 py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Your Main Article">
        <textarea v-model="postTextArea" type="text" class=" h-[200px] w-full  border-2 border-gray-400 text-[16px] mb-12 py-4 focus:border-black focus:outline-0 focus:border-gray-400 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Your Main Text"> </textarea>
        <input v-model="postLinkImage" type="text" class="w-full  border-b-2 border-b-gray-400 text-[16px] mb-12 py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Main Image link">
        <input v-model="mainTheme" type="text" class="w-full  border-b-2 border-b-gray-400 text-[16px] mb-12 py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Image theme">
      </div>
      <div class="mt-28">
        <button class="w-full uppercase text-white text-[16px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl h-[40px] active:shadow-2xl active:ease-in-out  hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:transition-all hover:duration-1000" @click="createPost">Create Post</button>
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
.close{
  visibility: hidden;
}
</style>