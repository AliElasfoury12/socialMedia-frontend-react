import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Get from '../components/API/Get'

export let handelSearch = createAsyncThunk(
	'search/handleSearch',
	async ({search, page}) => { 
        if (search !== undefined) {
            return await Get('search-users/'+ search +'?page='+ page)
        }
	}
)

export let handelPostsSearch = createAsyncThunk(
	'search/handlePostsSearch',
	async ({search, postsPage}) => { 
        return await   Get('search-posts/'+ search +'?page=' + postsPage)
	}
)

export const searchSlice = createSlice({
    name: 'search',

    initialState: {
        search: '',
        users: [],
        page: 1,
        lastPage:0,
        loading: false,
        end: false,
        posts: [],
        postsEnd: false,
        postsPage: 1,
        lastPostPage: 0
    },

    reducers: {
        setSearch: (state, {payload}) => {
            state.search = payload
        },

        setLoading: (state, {payload}) => {
            state.loading = payload
        },

        setPage: state => {
            state.page += 1
        },

        resetPage: state => {
            state.page = 1
            state.lastPage = 0
        },

        setEnd: (state, {payload}) => {
            state.end = payload
        },

        setPostsPage: state => {
            state.postsPage += 1
        },

        resetPostsPage: state => {
            state.postsPage = 1
            state.lastPostPage = 0
        },

        setPostsEnd: (state, {payload}) => {
            state.postsEnd = payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(handelSearch.fulfilled, (state, {payload})  => {
            if(payload == '' && state.page > 1) {
                state.end = true
                state.loading = false
            }else if(state.page  == 1){
                state.users = payload
                state.loading = false
            }else{
                state.users = [...state.users, ...payload]
                state.loading = false
                state.lastPage = state.page
            }
        })
        .addCase(handelPostsSearch.fulfilled, (state, {payload})  => {
            if(payload == '' && state.postsPage > 1) {
                state.postsEnd = true
                state.loading = false
            }else if(state.postsPage  == 1){
                state.posts = payload
                state.loading = false
            }else{
                state.posts = [...state.posts, ...payload]
                state.loading = false
                state.lastPostPage = state.postsPage
            }
        })
    }
})

export const { setSearch, setLoading, setPage, resetPage, setEnd, setPostsEnd, setPostsPage, resetPostsPage } = searchSlice.actions

export default searchSlice.reducer
