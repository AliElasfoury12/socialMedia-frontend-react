import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit'
import { Get } from '../components/API/APIMethods'

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

export const profileSlice = createSlice({
    name: 'profile',

    initialState: {
        usersData: [],
        user: {},
        usersPosts: {},
        loading: false,
    },

    reducers : {
		setLoading: (state, {payload}) => {
			state.loading = payload
		}
    },

    extraReducers: (builder) => {
        builder.addCase(getProfileUser.fulfilled, (state, {payload})  => { 
            const user = state.usersData[payload.user.id]
            if(user == undefined) state.usersData[payload.user.id] = payload.user  
            state.user = payload.user
        })
        .addCase(getUserPosts.fulfilled, (state, {payload})=> {
            if (payload == undefined) {
                state.loading = false 
                return 
            } 
            let userPosts = state.usersPosts[payload.userId]

            if(userPosts == undefined){
                userPosts = {posts: payload.posts, page: 1, lastPage: payload.lastPage, end: false}
                state.usersPosts[payload.userId] = userPosts
            }else {
                if(userPosts.end) {
                    state.loading = false
                    return
                }
                userPosts.posts.push(...payload.posts)
            }
            
            userPosts.page++

            if(userPosts.page >= userPosts.lastPage) userPosts.end = true
            state.loading = false
        })
        .addMatcher(
			isPending(getProfileUser),(state) => {state.loading = true}
		)
    }
})

export const {setLoading} = profileSlice.actions

export default profileSlice.reducer