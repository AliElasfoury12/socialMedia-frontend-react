import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Delete, Get, Post } from '../components/API/APIMethods'
import { deleteUserPost, followUser, updateUserPost } from './profileStore'

export const getPosts = createAsyncThunk(
	'posts/getPosts', async (_,thunkAPI) =>  {		
		const postsStore = thunkAPI.getState().posts
		if(postsStore.loading) return
		thunkAPI.dispatch(setLoading(true))
		if(postsStore.cursor == null) return
		return await Get('posts?cursor=' + postsStore.cursor)
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost', async (form, thunkAPI) => {
		let res = await Post('posts',form)
		res.post.user = thunkAPI.getState().auth.authUser
		res.post.likes_count = 0
		res.post.comments_count = 0
		return res
	}
)

export const updatePost = createAsyncThunk(
	'posts/updatePost', async ({postId, formdata}, {dispatch}) =>{
		const payload = await Post(`posts/${postId}`, formdata) 

		if(window.location.href.includes('user/profile')) {
			dispatch(updateUserPost({id : postId, ...payload.post}))
			return
		}

		return {id : postId, ...payload}
	}
)

export const deletePost = createAsyncThunk(
	'posts/deletePost', async ({postId},{dispatch}) =>
	{
		await Delete(`posts/${postId}`)

		if(window.location.href.includes('user/profile')) {
			dispatch(deleteUserPost(postId))
			return
		}
		
		return postId;
	}
)

export const SharePost = createAsyncThunk(
	'posts/SharePost', async ({postContent, post}, thunkAPI) => {
		const res = await Post(`posts/${post.id}/share`, {content: postContent})
		res.post.user = thunkAPI.getState().auth.authUser
		res.post.shared_post = post
		res.post.post_imgs = []
		res.post.likes_count = 0
		res.post.comments_count = 0
		return res
	}
)

export const deletePostImages = createAsyncThunk(
	'posts/deletePostImages', async ({postId, toDeleteImages}) => {
		await Delete(`delete-images/${postId}`, {images: toDeleteImages})
		return {postId: postId, images: toDeleteImages}
	}
)

export const followPostUser = createAsyncThunk(
	'posts/follow-post-user', async (userId, thunkAPI) => {
		const res = await thunkAPI.dispatch(followUser(userId))
		return {...res.payload, userId: userId}
	}
)

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		loading: false,
		cursor: '',
	},
  
	reducers: {
		changePostCount: (state, {payload}) => {
			const post = state.posts.find((post) => post.id == payload.postId)
			post.comments_count += payload.amount
		},
		setLoading: (state, {payload}) => {
			state.loading = payload
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getPosts.fulfilled, (state, {payload}) => {	
			if(!payload) {
				state.loading = false
				return
			}
			state.cursor = payload.nextCursor		
			state.posts.push(...payload.posts)
			state.loading = false
		})
		.addCase(updatePost.fulfilled, (state, {payload}) => {
			if(!payload) return

			const post = state.posts.find((post) => post.id == payload.id)			
			payload = payload.post
			post.content = payload.content
			post.post_imgs.push(...payload.post_imgs)
			state.loading = false
		})
		.addCase(deletePost.fulfilled, (state, {payload}) => {
			if(!payload) return			
			state.posts = state.posts.filter((post) => post.id !== payload)
		})
		.addCase(followPostUser.fulfilled, (state, {payload}) => {						
			state.posts = state.posts.map((post) => {
				if(post.user.id == payload.userId) 
					post.user.isAuthFollows = payload.follows
				
				if(post.shared_post?.user?.id == payload.userId) 
					post.shared_post.user.isAuthFollows = payload.follows
				
				return post
			})			
        })
		.addCase(deletePostImages.fulfilled, (state, {payload}) => {			
			const post = state.posts.find((post) => post.id == payload.postId)	
			post.post_imgs = post.post_imgs.filter(image => !payload.images.some(deletedImage => deletedImage.id == image.id))
        })
		.addMatcher(isFulfilled(createPost, SharePost),(state, {payload}) => {
			state.posts.unshift(payload.post)
			state.loading = false
		})
		.addMatcher(
			isPending(createPost, updatePost),(state) => {state.loading = true}
		)
	}
})

export const {changePostCount, setLoading} = postsSlice.actions

export default postsSlice.reducer
