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
  <div class="mt-[20px]">
     <div class="text-[22px]">{{props.post.name}}</div>
  </div>
</template>

<style scoped>

</style>