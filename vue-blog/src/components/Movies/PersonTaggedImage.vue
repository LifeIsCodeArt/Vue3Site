<script setup>
import {defineProps} from "vue";
const props = defineProps({
    file_path:{
        type: String
    },
})
</script>

<template>
    <img class="rounded-xl" :src="'https://www.themoviedb.org/t/p/w150_and_h225_bestv2' + props.file_path">
</template>

<style scoped>

</style>