<script setup>
import {defineProps, ref} from "vue";
const props = defineProps({
    credit:{
        type: Object,
        default: () => {}
    }

})

</script>

<template>
    <div class="w-[140px] h-[285px] flex flex-col border-2 rounded-xl mr-[15px] mb-[30px]">
        <RouterLink to="/current-person" v-if="props.credit.profile_path === null"><img  src="https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg" alt="" class="w-full h-full rounded-t-xl"></RouterLink>
        <RouterLink to="/current-person" v-else><img :src="'https://www.themoviedb.org/t/p/w138_and_h175_face' + props.credit.profile_path" alt="" class="rounded-t-xl"></RouterLink>
        <div class="flex flex-col pl-[10px] py-[5px]">
            <div class="font-bold text-[16px] overflow-hidden  roboto"><RouterLink to="/current-person" class="hover:opacity-50">{{props.credit.name}}</RouterLink></div>
            <div class=" text-[14px] overflow-hidden roboto ">{{props.credit.character}}</div>
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
</style>