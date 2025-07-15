import {  createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit'
import { Delete, Get, Post} from '../components/API/APIMethods'
import { changePostCount } from './postsStore'

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
	async ({postId, content, authUser}, thunkAPI) => { 
		const res =  await Post(`posts/${postId}/comments`, {content: content})	
		res.comment.user = authUser
		thunkAPI.dispatch(changePostCount({postId: postId, amount: 1}))
		return {...res, postId: postId}
	}
)

export const updateComment = createAsyncThunk(
	'comments/updateComments',
	async ({commentId, formData}, thunkAPI) => { 
		const postId = thunkAPI.getState().comments.postId
		
		const res =  await Post(`comments/${commentId}`, formData)	
		return {...res, postId: postId, commentId:commentId}
	}
)

export const deleteComment = createAsyncThunk(
	'comments/deleteComments',
	async (commentId, thunkAPI) => { 
		const postId = thunkAPI.getState().comments.postId
		const res =  await Delete(`comments/${commentId}`)

		thunkAPI.dispatch(changePostCount({postId: postId, amount: -1}))
		
		return {...res, postId: postId, commentId:commentId}
	}
)

export const commentsSlice = createSlice({
	name: 'comments',

	initialState: {
		comments: {/*postId : {data: [], page: 1} */},
		postId: '',
		show: false,
		loading:false,
		showList: false,
		editing: false,
		editId: 0,		
	},

	reducers: {
		setPostId: (state, {payload}) => { 
			state.postId = payload 
		},
		setShow: (state, {payload}) => { 
			state.show = payload 
		},
		setShowList: (state, {payload}) => {
			state.showList = payload
		},
		setEditing: (state, {payload}) => {
			state.editing = payload
		},
		setEditId:  (state, {payload}) => {
			state.editId = payload
		}
	},

	extraReducers: (builder) => {
		builder.addCase(getComments.fulfilled, (state, {payload}) => {	
			state.loading = false;	
					
			if(!payload || payload.comments.length == 0) return

			let postComments = state.comments[payload.postId]
							
			if(postComments == undefined){ 
				state.comments[payload.postId] = {data: payload.comments, cursor: '', end: false}
				postComments = state.comments[payload.postId]
			}else
				postComments.data.push(...payload.comments)

			postComments.cursor = payload.nextCursor

			if(postComments.data.length == payload.comments_count)
				postComments.end = true
		})
		.addCase(createComment.fulfilled, (state, {payload}) => {	
			state.loading = false;	
			
			const postComments = state.comments[payload.postId]
							
			if(postComments == undefined)
				state.comments[payload.postId].data.push(payload.comment) 
			else
				postComments.data.unshift(payload.comment)
				
		})
		.addCase(updateComment.fulfilled, (state, {payload}) => {	
			state.loading = false;	
			
			const postComments = state.comments[payload.postId]
			const updatedComment = postComments.data.find((comment) => comment.id == payload.commentId)
			updatedComment.content = payload.commentContent
			
			state.editing = false
			state.showList = false
		})
		.addCase(deleteComment.fulfilled, (state, {payload}) => {	
			state.loading = false;	
			
			const postComments = state.comments[payload.postId]
			state.comments[payload.postId].data = postComments.data.filter((comment) => comment.id != payload.commentId)
			
			state.showList = false
		})
		.addMatcher(
			isPending(getComments, createComment, updateComment, deleteComment),(state) => {state.loading = true}
		)
	}

})

export const {setShow, setShowList, setEditing, setEditId, setPostId} = commentsSlice.actions


export default commentsSlice.reducer