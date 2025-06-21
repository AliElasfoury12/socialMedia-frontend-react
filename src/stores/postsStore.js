import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import api from '../components/API/APIMethods'
import { follow } from './profileStore'

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		loading: false,
		end: false,
		page: 1 ,
		lastPage: 0
	},
  
	reducers: {
		setPostImages: (state, {payload}) => {
			let post = state.posts.find((post) => post.id == payload.id)
			post.post_imgs = payload.images
		},
		setPage: state => {
			state.page +=1
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state, {payload}) => {			
			if(payload == '') state.end = true
			else {
				state.posts.push(...payload.posts)
				state.lastPage = state.page
			}
			state.loading = false
		})
		.addCase(updatePost.fulfilled, (state, {payload}) => {			
			let post = state.posts.find((post) => post.id == payload.id)			
			payload = payload.post
			post.content = payload.content
			post.post_imgs = payload.post_imgs
			state.loading = false
		})
		.addCase(deletePost.fulfilled, (state, {payload}) => {			
			state.posts = state.posts.filter((post) => post.id !== payload)
		})
		.addCase(follow.fulfilled, (state, {payload}) => {			
			state.posts = state.posts.map((post) => {
				if(post.user.id == payload.id) {
					post.user.follows = payload.follows
				}
				return post
			})			
        })
		.addMatcher(
			isFulfilled(createPost, SharePost),(state, {payload}) => {
				state.posts = [payload.post, ...state.posts]
				state.loading = false
		})
		.addMatcher(
			isPending(getPosts, createPost, updatePost, SharePost),(state) => {state.loading = true}
		)
	}
})

export const {setPostImages, removePost, setPage, followPostUser} = postsSlice.actions

export default postsSlice.reducer

export const getPosts = createAsyncThunk(
	'posts/getPosts', async (page) =>  await api.GET('posts?page=' + page)
)

export const createPost = createAsyncThunk(
	'posts/createPost', async (form, thunkAPI) => {
		let res = await api.POST('posts',form)
		res.post.user = thunkAPI.getState().auth.authUser
		return res
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost', async ({postId, formdata}) =>{
		let payload = await api.POST(`posts/${postId}`, formdata) 
		payload = {id : postId, ...payload};
		return payload;
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost', async (postId) =>
	{
		await api.DELETE(`posts/${postId}`)
		return postId;
	}
)

export const SharePost = createAsyncThunk(
	'posts/SharePost', async ({postContent, post}, thunkAPI) => {
		let res = await api.POST('share-post', {content: postContent, shared_post_id: post.id})
		res.post.user = thunkAPI.getState().auth.authUser
		res.post.shared_post = post
		res.post.post_imgs = []
		return res
	}
)