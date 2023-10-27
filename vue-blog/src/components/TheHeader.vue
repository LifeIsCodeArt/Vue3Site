<script setup>
import {ref, computed} from "vue";
import ModalLogin from '../components/ModalLogIn.vue'
import {useAuthorizationStore} from "../stores/AuthorizationStore.js";
const reactiveBool = ref(true)
const store = useAuthorizationStore()
const storeLogin = computed(() =>{
  return store.userLogin && store.userPassword && store.userNickName
})

</script>

<template class="">
  <div class="w-full top-0 bg-gradient-to-r from-slate-900 to-slate-700 fixed z-40">
    <div class="h-[74px] mx-[80px] flex items-center justify-between z-10">
    <RouterLink to="/" class="flex justify-between items-center w-[105px]">
      <div class="h-8 w-8 bg-[#CF6F49] rounded-xl"></div>
      <div class="roboto font-bold text-[22px] text-white pl-2">Realco</div>
    </RouterLink>
    <nav class="h-[42px] flex justify-between items-center">
      <ul class="flex justify-between items-center w-[400px] mr-8">
          <RouterLink to="/"><li class="roboto w-auto text-center text-white text-[16px] font-bold leading-normal cursor-pointer hover:border-b-2 hover:border-b-yellow-500 hover:text-blue-300 hover:transition-all hover:ease-in-out hover:text-[18px] hover:duration-500">Posts</li></RouterLink>
          <RouterLink to="films"><li class="roboto w-auto text-center text-white text-[16px] font-bold leading-normal cursor-pointer hover:border-b-2 hover:border-b-yellow-500 hover:text-blue-300 hover:transition-all hover:ease-in-out  hover:text-[18px] hover:duration-500">Films</li></RouterLink>
          <RouterLink to="service"><li class="roboto w-auto text-center text-white text-[16px] font-bold leading-normal cursor-pointer hover:border-b-2 hover:border-b-yellow-500 hover:text-blue-300 hover:transition-all hover:ease-in-out  hover:text-[18px] hover:duration-500">Contacts</li></RouterLink>
          <RouterLink to="about-us"><li class="roboto w-auto text-center text-white text-[16px] font-bold leading-normal cursor-pointer hover:border-b-2 hover:border-b-yellow-500 hover:text-blue-300 hover:transition-all hover:ease-in-out  hover:text-[18px] hover:duration-500">About Us</li></RouterLink>
      </ul>
      <button v-if="!storeLogin" ref="loginButton"  class="w-[160px] h-full bg-[#CF6F49] rounded-md border border-[#CF6F49] flex justify-center items-center text-white hover:transition-all hover:ease-in-out hover:bg-green-500 hover:border-green-500 z-50" @click="reactiveBool = !reactiveBool">Log-In</button>
      <button v-else ref="loginButton"  class="w-[160px] h-full bg-[#CF6F49] rounded-md border border-[#CF6F49] flex justify-center items-center text-white hover:transition-all hover:ease-in-out hover:bg-green-500 hover:border-green-500 z-50" @click="store.logOut">Logout</button>

      <ModalLogin v-show="!reactiveBool"
      />
    </nav>
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
</style>