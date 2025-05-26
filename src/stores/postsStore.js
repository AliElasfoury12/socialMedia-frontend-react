import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../components/API/APIMethods'

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
		},
		followPostUser: (state, {payload}) => {
			state.posts = state.posts.map((post) => {
				if(post.user.id == payload.id) {
					post.user.follows = payload.follows
				}
				return post
			})			
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
		.addCase(getPosts.pending, (state) => { state.loading = true })
		.addCase(createPost.fulfilled, (state, {payload}) => {
			state.posts = [payload.post, ...state.posts]
			state.loading = false
		})
		.addCase(createPost.pending,  (state) => { state.loading = true })
		.addCase(updatePost.fulfilled, (state, {payload}) => {			
			let post = state.posts.find((post) => post.id == payload.id)			
			payload = payload.post
			post.content = payload.content
			post.post_imgs = payload.post_imgs
			state.loading = false
		})
		.addCase(updatePost.pending, (state) => { state.loading = true })
		.addCase(deletePost.fulfilled, (state, {payload}) => {			
			state.posts = state.posts.filter((post) => post.id !== payload)
		})
	}
})

export const {setPostImages, removePost, setPage, followPostUser} = postsSlice.actions

export default postsSlice.reducer

export const getPosts = createAsyncThunk(
	'posts/getPosts', async (page) =>  await api.GET('posts?page=' + page)
)

export const createPost = createAsyncThunk(
	'posts/createPost', async (form) => await api.POST('posts',form)
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