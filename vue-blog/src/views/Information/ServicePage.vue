<script setup>

</script>

<template>
  <div class=" mb-[100px] mt-[74px] w-full h-[400px] relative flex justify-center items-center backgroundPhotoSupport">
      <div class=" blur-[2px] w-[375px] h-[120px]  bg-black opacity-50 rounded-[62px] flex justify-center items-center">
      </div>
    <div class="absolute z-50 text-[58px] font-bold text-white">Our Services</div>
  </div>
  <form class="my-12 flex flex-col justify-center items-center">
        <label for="" class="text-[58px] font-bold">Contact us</label>
        <div class="grid grid-rows-3 grid-flow-col gap-4 h-[500px] w-[800px] my-12">
          <input type="text" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4 pb-[4px] focus:outline-0" placeholder="First Name">
          <input type="email" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4 pb-[4px] focus:outline-0" placeholder="Email">
          <input type="date" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4  focus:outline-0">
          <input type="text" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4 pb-[4px] focus:outline-0" placeholder="Last Name">
          <input type="tel" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4 pb-[4px] focus:outline-0" placeholder="Phone +380...">
          <input type="time" class="w-[372px] h-[50px] bg-gray-50 border-2 border-gray-200 rounded-2xl pl-4  focus:outline-0">
        </div>
    <textarea class="border-2 rounded-xl border-gray-200 pt-[20px] pl-[20px] w-[800px] h-[150px]" name="" placeholder="Describe what you’re looking for..."></textarea>
    <button class="h-[50px] mt-6 w-[120px] bg-blue-400 font-bold text-white rounded-3xl shadow-2xl">Send</button>
  </form>
</template>

<style scoped>
  .backgroundPhotoSupport{
    background-image: url("../../components/icons/Rectangle 39.png");
  }
</style>