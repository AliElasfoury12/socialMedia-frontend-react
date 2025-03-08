import {  createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Get from '../components/API/Get'

export let getComments = createAsyncThunk(
	'comments/getComments',
	async ({post, page}) => { 
		return await Get('comments/'+ post.id +'?page=' + page)
	}
)

export const commentsSlice = createSlice({
	name: 'comments',

	initialState: {
		comments: [],
		show: false,
		showList: false,
		editing: false,
		editId: '',
		postId: '',
		loading:false,
		end:false
		
	},

	reducers: {
		addComment: (state, action) => {
			state.comments = [ action.payload, ...state.comments]
		},

		deleteComment: (state, action) => {
			state.comments = state.comments.filter((comment) => comment.id != action.payload)
		},

		setPostId: (state, action) => {
			state.postId = action.payload
		},

		setShow: (state, action) => {
			state.show = action.payload
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
		},

	},

	extraReducers: (builder) => {
		builder.addCase(getComments.fulfilled, (state, {payload}) => {
			if(payload == '') {
				state.end = true
				state.loading = false
			}else{
				state.loading = false
			
				let exists = state.comments.find((comment) => comment.id == payload[0].id)
				if(!exists){
					state.comments = [...state.comments, ...payload ]
				}
			}
		})
	}

})

export let {
			addComment, deleteComment,
			setShow, setShowList, setEditing, setEditId, setPostId,
			setLoading, setEnd
		} = commentsSlice.actions


export default commentsSlice.reducer