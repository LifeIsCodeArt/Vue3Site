<script setup>
import {onMounted, ref} from "vue";
import {useSignInForm} from '../stores/AuthorizationStore.js'
import axios from "axios";
const signInStore = useSignInForm()
const signInUser = () =>{
  signInStore.getUserPost({
    'email': userData.value.logInEmail,
    'password': userData.value.logInPassword,
    'name': userData.value.logInName
  })
}
const userData = ref({
})


</script>

<template>
  <div ref="modalSingInWindow" class="mt-[120px] flex justify-center items-center  w-full absolute top-[120px] left-0">
    <div class="h-[800px] w-[600px] bg-white py-8 px-8 z-0 border border-gray-500 flex flex-col relative">
      <h1 class="flex justify-center mb-5 roboto font-bold text-[22px]">Profile Creation</h1>
      <div class="mt-20">
        <div class="">
        <input v-model="userData.logInEmail"  type="email" class="w-full  border-b-2 border-b-gray-400 text-[16px] py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black focus:mb-12" placeholder="Type your email">
        <p class="mb-12 text-[11px]">Email must contain at least 10 symbols @email.com</p>
        </div>
        <div class="">
        <input v-model="userData.logInPassword" type="password" class="w-full  border-b-2 border-b-gray-400 text-[16px]  py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black focus:mb-12" placeholder="Type your password">
        <p class="mb-12 text-[11px]">Password must contain at least 8 symbols of Latin alphabet, 1 capital letter and 2 numbers </p>
        </div>
        <div class="">
        <input v-model="userData.logInName"  type="text" class="w-full  border-b-2 border-b-gray-400 text-[16px]  py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black focus:mb-12" placeholder="Type your nickname">
        <p class="text-[11px]">Nickname must contain at least 8 symbols of Latin alphabet</p>
        </div>
        </div>
      <div class="mt-28">
        <button class="w-full uppercase text-white text-[16px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl h-[40px] active:shadow-2xl active:ease-in-out  hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:transition-all hover:duration-1000" @click="signInUser"><RouterLink to="/">Create Profile</RouterLink></button>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>