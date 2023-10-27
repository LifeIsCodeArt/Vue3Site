import {defineStore} from "pinia/dist/pinia";
import {ref} from "vue";
import mainPagePosts from "../services/api/getMainPageData.js";
import getPersonCommentSection from "../services/api/getCurrentPostComments.js";


export const usePostsStore = defineStore('mainPosts', () => {
    const getPostsData = ref([])
    const getPostsUl = async () => {
        try {
            const res = await mainPagePosts.getMainPageData()
            getPostsData.value = res.data
            console.log(getPostsData.value)
            console.log(getPostsData)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getPostsData, getPostsUl}

})

export const usePostCommentsStore = defineStore('postComments', () => {
    const getPostsCommentsData = ref([])
    const getPostsCommentsUl = async () => {
        try {
            const res = await getPersonCommentSection.getPersonCommentSection()
            getPostsCommentsData.value = res.data.commentSection
            console.log(getPostsCommentsData.value)
            console.log(res.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getPostsCommentsData, getPostsCommentsUl}

})