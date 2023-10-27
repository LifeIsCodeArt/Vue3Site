<script setup>
import {defineEmits,ref, onMounted} from "vue";
import 'vue3-toastify/dist/index.css'
import { toast } from 'vue3-toastify'
import {Field,Form,ErrorMessage, useForm} from "vee-validate"
import * as yup from 'yup'

import {useAuthorizationStore,useUsersStore} from "../stores/AuthorizationStore.js";

const modalLoginWindow = ref(null)

const AuthorizationStore = useAuthorizationStore()
const usersStore = useUsersStore()
const userEmail = ref(null)
const userPassword = ref(null)
const showModal = ref(true)
  const schema = yup.object({
    Email: yup.string().email().required(),
    Password: yup.string().min(6).required(),
  });

  function onSubmit(values) {
    alert(JSON.stringify(values, null, 2));
  }

  const { defineInputBinds, errors, handleSubmit } = useForm({
  validationSchema: schema,
  });

const sendUserData = async () =>{
  if (userEmail.value && userPassword.value){
   await usersStore.getUsers(userEmail.value, userPassword.value)
   toast.info(`Loading...`,{
      autoClose: 1000,
      position: toast.POSITION.BOTTOM_RIGHT
    })
    try {
      if(localStorage.getItem("userLogin").length) {
        showModal.value = false
        toast.success(`Hello and Welcome! My dear user ${localStorage.getItem("userNickname")}`, {
          autoClose: 3000,
          delay: 2000,
          position: toast.POSITION.BOTTOM_RIGHT
        })
        AuthorizationStore.logIn()
      }
      else
      {
        toast.error(`Error, username "${userEmail.value}" is incorrect, try again`,{
          autoClose: 3000,
          delay: 2000,
          position: toast.POSITION.BOTTOM_RIGHT
        })
        console.log(`${userEmail.value}`)
        console.log(`${userPassword.value}`)
        console.log(`Невозможно достучаться до адреса`)
      }
    }
    catch (err) {
      console.log(`You have an error with authorisation:`, userEmail.value)
    }
  }

}
onMounted(() =>{
  toast.success('Hello EVERYNYONE!',{
    autoClose: 2000,
    position: toast.POSITION.BOTTOM_RIGHT,
  })
})
</script>

<template>
  <div v-if="showModal" ref="modalLoginWindow" class="flex justify-center items-center bg-[rgba(0,0,0,.56)] z-10 h-[1020px] w-[100%] absolute top-0 left-0">
  <div class=" h-[800px] w-[600px] bg-white py-8 px-8 z-50 border border-gray-500 flex flex-col relative">
    <h1 class="flex justify-center mb-5 roboto font-bold text-[22px]">Sing in</h1>
    <div class="absolute text-gray-500 text-[18px] font-bold right-6 top-[20px] cursor-pointer" @click="showModal = !showModal">Х</div>
    <div class="mt-20">
      <Form :validation-schema="schema" v-slot="{errors}"></Form>
      <Field  v-model="userEmail" name="Email" type="email" class="w-full  border-b-2 border-b-gray-400 text-[16px] py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Your Email"></Field>
      <span class="p-error">{{errors.Email}}</span>
      <Field v-model="userPassword" name="Password" type="password" class="w-full  border-b-2 border-b-gray-400 text-[16px] py-4 focus:border-b-black focus:outline-0 focus:transition-all focus:ease-in-out focus:duration-500 focus:text-[22px] focus:text-black" placeholder="Your Password"></Field>
      <span class="p-error">{{errors.Password}}</span>
    </div>
    <div class="mt-28">
      <button class="w-full uppercase text-white text-[16px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl h-[40px] active:shadow-2xl active:ease-in-out  hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 hover:transition-all hover:duration-1000" @click="sendUserData()">Sign In</button>
    </div>
    <div class="flex flex-col justify-center items-center mt-10">
      <div class="text-[16px] text-gray-500">or Sing in with:</div>
      <div class="flex items-center mt-10">
        <a href="#" class="border border-green-300 w-[80px] h-[50px] rounded-2xl flex justify-center items-center hover:shadow-xl hover:shadow-[#8dd83d] hover:transition-all hover:ease-in-out hover:duration-1000"><img src="../components/icons/Faacebook.png" alt="#"></a>
        <a href="#" class="border border-green-300 w-[80px] h-[50px] mx-10 rounded-2xl flex justify-center items-center shadow-2xl hover:shadow-xl hover:shadow-[#8dd83d] hover:transition-all hover:ease-in-out hover:duration-1000"><img src="../components/icons/Instagram.png" alt="#"></a>
        <a href="#" class="border border-green-300 w-[80px] h-[50px] rounded-2xl flex justify-center items-center shadow-2xl hover:shadow-xl hover:shadow-[#8dd83d] hover:transition-all hover:ease-in-out hover:duration-1000"><img src="../components/icons/Twitter.png" alt="#" class=""></a>
      </div>
    </div>
    <div class="absolute bottom-12 right-12 text-[16px]">Not a member? <RouterLink to="/sign-in-page" class="text-cyan-400" @click="showModal = !showModal">Sign In</RouterLink></div>
  </div>
  </div>
</template>

<style>
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