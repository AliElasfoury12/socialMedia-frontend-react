import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Get, Post } from '../components/API/APIMethods'

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

export const profileSlice = createSlice({
    name: 'profile',

    initialState: {
        usersData: [],
        user: {},
        usersPosts: {},
        loading: false,
    },

    reducers : {
        updateUserPost: (state, {payload}) => {
            const userPosts = state.usersPosts[state.user.id].posts
			const index = userPosts.findIndex((post) => post.id == payload.id)
            userPosts[index].content = payload.content
            userPosts[index].postImgs = payload.post_imgs
		},
        deleteUserPost: (state, {payload}) => {
			state.usersPosts[state.user.id].posts = state.usersPosts[state.user.id].posts.filter((post) => post.id != payload)
		},
        changeUserPostCount: (state, {payload}) => {
			const post = state.usersPosts[state.user.id].posts.find((post) => post.id == payload.postId)
			post.comments_count += payload.amount
		},
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
            if (payload == undefined) return 
             
            let userPosts = state.usersPosts[payload.userId]

            if(userPosts == undefined){
                userPosts = {posts: payload.posts, page: 1, lastPage: payload.lastPage, end: false}
                state.usersPosts[payload.userId] = userPosts
            }else {
                if(userPosts.end) return
                userPosts.posts.push(...payload.posts)
            }
            
            userPosts.page++
            if(userPosts.page >= userPosts.lastPage) userPosts.end = true

        })
        .addCase(changeProfileImage.fulfilled, (state, {payload})  => { 
            state.usersData[state.user.id].profile_pic.url = payload.profile_image_url
            state.user.profile_pic.url = payload.profile_image_url

            state.usersPosts[state.user.id].posts = state.usersPosts[state.user.id].posts.map((post) => {
                post.user.profile_pic.url = payload.profile_image_url

                if(post.shared_post.user?.id == state.user.id)
                    post.shared_post.user.profile_pic.url = payload.profile_image_url
                
                return post
            })
        })
        .addMatcher(
			isPending(getProfileUser, changeProfileImage),(state) => {state.loading = true}
		).addMatcher(
			isFulfilled(changeProfileImage, getUserPosts),(state) => {state.loading = false}
		)
    }
})

export const { updateUserPost, deleteUserPost, setLoading, changeUserPostCount} = profileSlice.actions

export default profileSlice.reducer