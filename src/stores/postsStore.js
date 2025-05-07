import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../components/API/APIMethods'

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		showEditPostModal: false,
		showCreatePostModal: false,
		editId: '',
		showList: false,
		loading: false,
		end: false,
		page: 1 ,
		lastPage: 0
	},

	reducers: {
		addPost: (state, {payload}) => {
			state.posts = [payload, ...state.posts]
		},

		editPost: (state, {payload}) => {
			let post = state.posts.find((post) => post.id == state.editId)
			post.post = payload.post
			post.post_imgs = payload.post_imgs
		}, 
		
		removePost: (state, {payload}) => {
			state.posts = state.posts.filter((post) => post.id !== payload)
		},

		setShowEditPostModal: (state, {payload}) => {
			state.showEditPostModal = payload
		},

		setEditId: (state, {payload}) => {
			state.editId = payload
		},

		setShowList: (state, {payload}) => {
			state.showList = payload
		},

		setLoading: (state, {payload}) => {
			state.loading = payload
		},

		setPage: state => {
			state.page +=1
		},

		setShowCreatePostModal: (state, {payload}) => {
			state.showCreatePostModal = payload
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
			if(payload == '') {
				state.end = true
				state.loading = false
			}else {
				state.posts.push(...payload.posts)
				state.loading = false
				state.lastPage = state.page
			}
		}).addCase(createPost.fulfilled, (state, {payload}) => {
			state.posts = [payload.post, ...state.posts]
			state.loading = false
			state.showCreatePostModal = false
		})
	}
})

export let { 
			addPost, setShowEditPostModal,setEditId, removePost,
			editPost, setShowList, setLoading, setPage, followPostUser,
			setShowCreatePostModal
		} = postsSlice.actions

export default postsSlice.reducer


export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async (page, thunkAPI) => { 
		thunkAPI.dispatch(setLoading(true));
		return await api.GET('posts?page=' + page)
	}
)

export const createPost = createAsyncThunk(
	'posts/createPost',
	async (form, thunkAPI) => { 
		thunkAPI.dispatch(setLoading(true));
		return await api.POST('posts',form)
	}
)