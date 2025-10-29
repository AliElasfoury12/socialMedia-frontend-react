import { createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { changeProfileImage, followUser, getProfileUser, getUserPosts } from './profile_thunks'

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
            const user = state.usersData[state.user.id]

            user.profile_pic.url = payload.profile_image_url
            state.user.profile_pic.url = payload.profile_image_url

            const userPosts = state.usersPosts[state.user.id];

            userPosts.posts = userPosts.posts.map((post) => {
                post.user.profile_pic.url = payload.profile_image_url

                if(post.shared_post && post.shared_post.user?.id == state.user.id)
                    post.shared_post.user.profile_pic.url = payload.profile_image_url
                
                return post
            })
        })
        .addCase(followUser.fulfilled,(state, {payload}) =>{
            state.user.is_auth_user_follows = payload.follows
            
            if(payload.follows) state.user.followers_count++
            else state.user.followers_count--
            
            const userPosts = state.usersPosts[payload.userId].posts
            userPosts.forEach((post) => {
                post.user.is_auth_user_follows = payload.follows
            })

            state.usersData[payload.userId] = state.user
        })
        .addMatcher(
			isPending(getProfileUser, changeProfileImage),(state) => {state.loading = true}
		).addMatcher(
			isFulfilled(changeProfileImage, getUserPosts, getProfileUser),(state) => {state.loading = false}
		)
    }
})

export const { updateUserPost, deleteUserPost, setLoading, changeUserPostCount} = profileSlice.actions

export default profileSlice.reducer