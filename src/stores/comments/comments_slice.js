import { createSlice } from '@reduxjs/toolkit'
import { createComment, deleteComment, getComments, updateComment } from './comments_thunks'

export const commentsSlice = createSlice({
	name: 'comments',

	initialState: {
		comments: {/*postId : {data: [], page: 1} */},
		postId: '',
		show: false,
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

			if(!payload || payload.comments.length == 0) return

			let postComments = state.comments[payload.postId]
							
			if(postComments == undefined){ 
				state.comments[payload.postId] = {data: payload.comments, cursor: '', end: false}
				postComments = state.comments[payload.postId]
			}else
				postComments.data.push(...payload.comments)

			postComments.cursor = payload.nextCursor

			if(postComments.data.length == payload.comments_count) postComments.end = true
		})
		.addCase(createComment.fulfilled, (state, {payload}) => {	
			const postComments = state.comments[payload.postId]
							
			if(postComments == undefined)
				state.comments[payload.postId] = {data: [payload.comment], cursor: '', end: false}
			else
				postComments.data.unshift(payload.comment)
				
		})
		.addCase(updateComment.fulfilled, (state, {payload}) => {	
			const postComments = state.comments[payload.postId]
			const updatedComment = postComments.data.find((comment) => comment.id == payload.commentId)
			updatedComment.content = payload.commentContent
			
			state.editing = false
			state.showList = false
		})
		.addCase(deleteComment.fulfilled, (state, {payload}) => {	
			const postComments = state.comments[payload.postId]
			state.comments[payload.postId].data = postComments.data.filter((comment) => comment.id != payload.commentId)
			state.showList = false
		})
	}

})

export const {setShow, setShowList, setEditing, setEditId, setPostId} = commentsSlice.actions


export default commentsSlice.reducer