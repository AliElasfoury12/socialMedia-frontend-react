import { createAsyncThunk } from '@reduxjs/toolkit'
import { Get, Post } from '../../components/API/APIMethods'
import { setLoading } from './profile_slice'

export const getProfileUser = createAsyncThunk(
    'profile/getProfileUser',
    async (userId, thunkAPI) => {
        const profileStore = thunkAPI.getState().profile
        const user = profileStore.usersData[userId]
        if(user) return {user: user} 
        return await Get(`users/${userId}`) 
    }
)

export const followUser = createAsyncThunk(
    'profile/follow-user',
    async (userId) => {
        const res = await Get(`follow/${userId}`)
        return {...res, userId: userId}
    }
)

export const getUserPosts = createAsyncThunk(
    'profile/userPosts',
    async (userId, thunkAPI) => {                
        const profileStore = thunkAPI.getState().profile
        const userData = profileStore.usersPosts[userId]

        if (profileStore.loading) return
        thunkAPI.dispatch(setLoading(true))

        if(userData?.end) return {userId: userId}

        let page = 1
        if(userData) page = userData.page
        
        const res = await Get(`user-posts/${userId}?page=${page}`)
        return {...res, userId: userId}
    }
)

export const changeProfileImage = createAsyncThunk(
    'profile/changeProfileImage',
    async (formdata) => await Post('user-profile-image', formdata)
)