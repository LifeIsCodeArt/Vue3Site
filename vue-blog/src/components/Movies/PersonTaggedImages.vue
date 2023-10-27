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
  <div class="h-[195px] w-[130px] mr-[10px]">
      <img class="rounded-xl" :src="'https://www.themoviedb.org/t/p/w150_and_h225_bestv2' + props.post.file_path">
      <div v-if="props.post.result.media.name !== undefined" class="">{{props.post.result.media.name}}</div>
      <div v-else class="">{{props.post.result.media.title}}</div>
  </div>
</template>


<style scoped>

</style>