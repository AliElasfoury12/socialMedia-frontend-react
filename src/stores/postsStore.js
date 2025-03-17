import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GET } from '../components/API/APIMethods'

export let getPosts = createAsyncThunk(
	'posts/getPosts',
	async (page) => { 
		return await GET('posts?page=' + page)
	}
)

export const postsSlice = createSlice({
	name: 'posts',

	initialState: {
		posts: [],
		showEditModal: false,
		editId: '',
		showList: false,
		loading: true,
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

		setShowEditModal: (state, {payload}) => {
			state.showEditModal = payload
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
			console.log(payload);
			
			if(payload == '') {
				state.end = true
				state.loading = false
			}else {
				state.posts.push(...payload.posts)
				state.loading = false
				state.lastPage = state.page
			}
		})
	}
})

export let { 
			addPost, setShowEditModal,setEditId, removePost,
			editPost, setShowList, setLoading, setPage, followPostUser
		} = postsSlice.actions

export default postsSlice.reducer