import {  createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit'
import { Get, Post } from '../components/API/APIMethods'
import { increasePostCount } from './postsStore'

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
		thunkAPI.dispatch(increasePostCount(postId))
		return {...res, postId: postId}
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
		editId: '',
		end:false
		
	},

	reducers: {
		setPostId: (state, {payload}) => { 
			state.postId = payload 
		},
		setShow: (state, {payload}) => { 
			state.show = payload 
		},




		addComment: (state, action) => {
			state.comments = [ action.payload, ...state.comments]
		},
		deleteComment: (state, action) => {
			state.comments = state.comments.filter((comment) => comment.id != action.payload)
		},
		setShowList: (state, action) => {
			state.showList = action.payload
		},
		setEditing: (state, action) => {
			state.editing = action.payload
		},
		setEditId:  (state, action) => {
			state.editId = action.payload
		},
		setLoading:  (state, action) => {
			state.loading = action.payload
		},
		setEnd:  (state, action) => {
			state.end = action.payload
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
		.addMatcher(
			isPending(getComments, createComment),(state) => {state.loading = true}
		)
	}

})

export let {
			addComment, deleteComment,
			setShow, setShowList, setEditing, setEditId, setPostId,
			setLoading, setEnd
		} = commentsSlice.actions


export default commentsSlice.reducer