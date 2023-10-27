<script setup>
import {defineProps} from "vue";
const props = defineProps({
    post:{
        type: Object,
        default: () => {}
    }

})
</script>

<template>
    <div class="w-auto text-left px-[10px] my-[5px] mr-[5px] py-[5px] font-bold text-[12px] border-2 bg-gray-200">
        {{props.post.name}}
    </div>
</template>

<style scoped>

</style>