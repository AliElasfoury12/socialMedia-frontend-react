import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Delete, Get, Post } from '../components/API/APIMethods'
import { follow } from './profileStore'
import { emptyObject } from '../utils/objects'

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		loading: false,
		cursor: '' ,
	},
  
	reducers: {
		setPostImages: (state, {payload}) => {
			const post = state.posts.find((post) => post.id == payload.id)
			post.post_imgs = payload.images
		},
		changePostCount: (state, {payload}) => {
			const post = state.posts.find((post) => post.id == payload.postId)
			post.comments_count += payload.amount
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state, {payload}) => {			
			if(payload == undefined) state.cursor = null
			else {		
				state.cursor = payload.nextCursor		
				state.posts.push(...payload.posts)
			}
			state.loading = false
		})
		.addCase(updatePost.fulfilled, (state, {payload}) => {			
			let post = state.posts.find((post) => post.id == payload.id)			
			payload = payload.post
			post.content = payload.content
			post.post_imgs.push(...payload.post_imgs)
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
				
				if( ( post.shared_post != undefined && !emptyObject(post.shared_post) ) && post.shared_post.user.id == payload.id) {
					post.shared_post.user.follows = payload.follows
				}

				return post
			})			
        })
		.addCase(deletePostImages.fulfilled, (state, {payload}) => {			
			const post = state.posts.find((post) => post.id == payload.postId)	
			post.post_imgs = post.post_imgs.filter(image => {! payload.images.includes(image)})
        })
		.addMatcher(
			isFulfilled(createPost, SharePost),(state, {payload}) => {
				state.posts.unshift(payload.post)
				state.loading = false
		})
		.addMatcher(
			isPending(getPosts, createPost, updatePost, SharePost),(state) => {state.loading = true}
		)
	}
})

export const {setPostImages, removePost, followPostUser, changePostCount} = postsSlice.actions

export default postsSlice.reducer

export const getPosts = createAsyncThunk(
	'posts/getPosts', async (_,thunkAPI) =>  {
		const state = thunkAPI.getState().posts		
		if(state.cursor == null) return
		return await Get('posts?cursor=' + state.cursor)
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost', async (form, thunkAPI) => {
		let res = await Post('posts',form)
		res.post.user = thunkAPI.getState().auth.authUser
		return res
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost', async ({postId, formdata}) =>{
		const payload = await Post(`posts/${postId}`, formdata) 
		return {id : postId, ...payload}
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost', async ({postId}) =>
	{
		await Delete(`posts/${postId}`)
		return postId;
	}
)

export const SharePost = createAsyncThunk(
	'posts/SharePost', async ({postContent, post}, thunkAPI) => {
		let res = await Post('share-post', {content: postContent, shared_post_id: post.id})
		res.post.user = thunkAPI.getState().auth.authUser
		res.post.shared_post = post
		res.post.post_imgs = []
		return res
	}
)

export const deletePostImages = createAsyncThunk(
	'posts/deletePostImages', async ({postId, toDeleteImages}) => {
		await Delete(`delete-images/${postId}`, {images: toDeleteImages})
		return {postId: postId, images: toDeleteImages}
	}
)