import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Get from '../components/API/Get'

export let profileUser = createAsyncThunk(
    'profile/profileuser',
    async (id) => {
        return await Get(`users/${id}`)
    }
)

export let follow = createAsyncThunk(
    'profile/follow',
    async (id) => {
        return await Get(`follow/${id}`)
    }
)

export let userPosts = createAsyncThunk(
    'profile/userPosts',
    async ({id, page}) => {
        let res = await Get(`user-posts/${id}?page=${page}`)
        return {posts: res.posts, page: res.page, lastPage: res.lastPage, id}
    }
)

export const profileSlice = createSlice({
    name: 'profile',

    initialState: {
      user: [],
      usersData: [],
      userData:[],
      posts: [],
      loading: false,
      page: 1,
      users: []
    },

    reducers: {
        setUserData: (state, {payload}) => {
            if(payload){
                state.page = payload.page
                state.userData = payload
            }else{
                state.page = 1
            }  
        },

        setLoading: (state, {payload}) => {
            state.loading = payload
        },

        setEnd: (state, {payload}) => {
            state.end = payload
        },

        resetPage: state => {
            state.page = 1
        },

        setPage: state => {
            state.page += 1
        },

    },

    extraReducers: (builder) => {
        builder.addCase(profileUser.fulfilled, (state, {payload})  => {
            state.user = payload
            /*
            let exists = state.users.find((user) => user.id == payload.id) 

            if(exists) {
                state.user = exists
            }else{
                state.user = payload
                state.users.push(payload)   
            }  
                */      
        })
        .addCase(userPosts.fulfilled, (state, {payload})=> {
            let exists = state.usersData?.find((userData) => userData?.user.id == payload.id ) 
            
            if(payload.posts == '' && exists){
                exists.end = true
            }
            else{

                if(!exists && payload.posts != '') {
                    state.userData = {   
                        user: state.user, 
                        posts: [...payload.posts],
                        page: payload.page, 
                        lastPage: payload.lastPage, 
                        end: false
                    }

                    state.page = payload.page
                    state.usersData.push(state.userData)

                }else if(exists) {
                    exists.page = payload.page
                    exists.posts.push(...payload.posts)
                }
            }

            state.loading = false

         })
        .addCase(follow.fulfilled, (state, {payload})=> {
            state.user.follows = payload.follows
            state.user.followers_count = payload.followers_count
            state.user.followings_count = payload.followings_count

            let userData = state.usersData.find((posts) => posts.userId == state.user.id)

            userData.posts = userData.posts.map((post) => {
                post.user.follows = payload.follows
                return post
            })	
        })
    }
})

export const { setUserData, setLoading, setEnd, resetPage, setPage, lastPage } = profileSlice.actions

export default profileSlice.reducer