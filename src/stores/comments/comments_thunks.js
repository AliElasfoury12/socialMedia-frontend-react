import { createAsyncThunk } from '@reduxjs/toolkit'
import { Delete, Get, Post, Put} from '../../components/API/APIMethods'
import { changePostCount } from './../posts/posts_slice'
import { changeUserPostCount } from './../profile/profile_slice'

export const getComments = createAsyncThunk(
	'comments/getComments',
	async (post, thunkAPI) => { 
		const state = thunkAPI.getState().comments
		const postComments = state.comments[post.id]
				
		if(post.id != state.postId || post.comments_count == 0 || postComments?.end) return 
		const cursor = (postComments?.cursor) ? postComments.cursor : ''

		const res =  await Get(`posts/${post.id}/comments?cursor=${cursor}`)		
		return {...res, postId:  post.id, comments_count: post.comments_count}
	}
)

export const createComment = createAsyncThunk(
	'comments/createComments',
	async ({postId, content, authUser}, thunkAPI ) => { 
		const res =  await Post(`posts/${postId}/comments`, {content: content})	
		res.comment.user = authUser
		change_post_count(thunkAPI, postId, 1)
		return {...res, postId: postId}
	}
)

export const updateComment = createAsyncThunk(
	'comments/updateComments',
	async ({commentId, formData}, thunkAPI) => { 
		const postId = thunkAPI.getState().comments.postId
		const res =  await Put(`comments/${commentId}`, formData)	
		return {...res, postId: postId, commentId:commentId}
	}
)

export const deleteComment = createAsyncThunk(
	'comments/deleteComments',
	async (commentId, thunkAPI) => { 
		const postId = thunkAPI.getState().comments.postId
		const res =  await Delete(`comments/${commentId}`)
		change_post_count(thunkAPI, postId, -1)
		return {...res, postId: postId, commentId:commentId}
	}
)

const change_post_count = (thunkAPI, post_id, amount) => {
	if(window.location.href.includes('user/profile/'))
		thunkAPI.dispatch(changeUserPostCount({postId: post_id, amount: amount}))
	else 
		thunkAPI.dispatch(changePostCount({postId: post_id, amount: amount}))
}