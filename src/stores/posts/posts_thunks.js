import { createAsyncThunk } from '@reduxjs/toolkit'
import { Delete, Get, Post } from '../../components/API/APIMethods'
import { deleteUserPost, updateUserPost } from '../profileStore'
import { setLoading } from './posts_slice'

export const getPosts = createAsyncThunk(
	'posts/getPosts', async (_,thunkAPI) =>  {		
		const postsStore = thunkAPI.getState().posts		
		if(postsStore.loading || postsStore.cursor === null) return
		thunkAPI.dispatch(setLoading(true))
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
		const res = await Post(`posts/share/${post.id}`, {content: postContent})
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
	'posts/follow-post-user', async (userId) => {
		const res = await Get(`follow/${userId}`)
		return {...res, userId: userId}
	}
)