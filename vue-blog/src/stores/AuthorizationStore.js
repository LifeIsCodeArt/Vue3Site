import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import users from "../services/api/getLoginData.js";
import postSingInReq from "../services/api/postSingInReq.js";



export const useAuthorizationStore = defineStore('userStatus', () => {
    //const userStatus = ref(false)
    //const currentPage = ref(localStorage.getItem("currentPage"))
    const userLogin = ref(localStorage.getItem("userLogin"))
    const userPassword = ref(localStorage.getItem("userPassword"))
    const userNickName = ref(localStorage.getItem("userNickname"))
    const logOut = () =>{
        userLogin.value = ''
        userPassword.value = ''
        userNickName.value = ''
        localStorage.setItem("userLogin", '');
        localStorage.setItem("userPassword", '')
        localStorage.setItem("userNickname", '')
    }
    const logIn = () =>{
        userLogin.value = localStorage.getItem("userLogin")
        userPassword.value = localStorage.getItem("userPassword")
        userNickName.value = localStorage.getItem("userNickname")
    }
    return {
        userLogin,
        userPassword,
        userNickName,
        logOut,
        logIn
    }
})

export const useUsersStore = defineStore('users', () => {
    const getUsersData = ref([])
    const authorisationComplete = ref()
    const getUsers = async (userEmail, userPassword) => {
        try {
            const res = await users.getUsers()
            getUsersData.value = res.data
            console.log(res.data)
            getUsersData.value.forEach(item =>{
                if ((item.password === userPassword && item.email === userEmail) || (item.password === userPassword && item.name === userEmail)){
                    localStorage.setItem("userLogin", item.email);
                    localStorage.setItem("userPassword", item.password)
                    localStorage.setItem("userNickname", item.name)
                    authorisationComplete.value = true
                    return
                }else {
                    console.log(`unlucky, not found this email ${item.email}, and password ${item.password}, ${item.value}`)
                    authorisationComplete.value = false
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return {
        getUsersData,
        getUsers,
        authorisationComplete
    }

})

export const useSignInForm = defineStore('postUser', () => {
    const getUserPost = async (data) => {
        try {
            await postSingInReq.getUserData(data)
        }
        catch (err) {
            console.log(err)
        }
    }

    return {getUserPost}

})
