import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Get } from '../components/API/APIMethods'

export const searchBar = createAsyncThunk(
	'searchBar/handleSearch',
	async (search, thunkAPI) => { 
        const searchStore = thunkAPI.getState().search
        if (searchStore.loading || !search) return
        thunkAPI.dispatch(setLoading(true))
        return await Get(`search-users/${search}?cursor=${searchStore.usersCursor}`)
	}
)

export const usersSearch = createAsyncThunk(
	'search/handleSearch',
	async (search, thunkAPI) => { 
        const searchStore = thunkAPI.getState().search
        const isEnd = searchStore.usersCursor == null 
        if (isEnd || !search) return
        return await Get(`search-users/${search}?cursor=${searchStore.usersCursor}`)
	}
)

export const postsSearch = createAsyncThunk(
	'search/handlePostsSearch',
	async (search,thunkAPI) => { 
        const searchStore = thunkAPI.getState().search
        const isEnd = searchStore.postsCursor == null 
        if (isEnd || !search) return
        return await Get(`posts/search/${search}?cursor=${searchStore.postsCursor}`)
	}
)

export const searchSlice = createSlice({
    name: 'search',

    initialState: {
        loading: false,
        users: [],
        usersCursor: '',
        posts: [],
        postsCursor: '',
        show: false,
    },

    reducers: {
        setLoading: (state, {payload}) => {
            state.loading = payload
        },
        setShow: (state, {payload}) => {
            state.show = payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(searchBar.fulfilled, (state, {payload})  => {
            if(!payload) return
            state.users = payload.users
            state.usersCursor = payload.nextCursor
            state.show = true
        })
        .addCase(usersSearch.fulfilled, (state, {payload})  => {
            if(!payload) return
            state.users = [...state.users,...payload.users]
            state.usersCursor = payload.nextCursor
        })
        .addCase(postsSearch.fulfilled, (state, {payload})  => {
            if(!payload) return
            state.posts = [...state.posts,...payload.posts]
            state.postsCursor = payload.nextCursor
        })
        .addMatcher(isPending(usersSearch, postsSearch),(state) => {state.loading = true})
		.addMatcher(isFulfilled(searchBar,usersSearch, postsSearch),(state) => {state.loading = false})
    }
})

export const { setLoading, setShow } = searchSlice.actions

export default searchSlice.reducer
