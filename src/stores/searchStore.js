import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Get } from '../components/API/APIMethods'

export const usersSearch = createAsyncThunk(
	'search/handleSearch',
	async (_, thunkAPI) => { 
        const searchStore = thunkAPI.getState().search
        const isEnd = searchStore.usersCursor == null && window.location.href.includes('/search/users/')
        if (isEnd || searchStore.loading || !searchStore.search) return
        thunkAPI.dispatch(setLoading(true))
        return await Get(`search-users/${searchStore.search}?cursor=${searchStore.usersCursor}`)
	}
)

export const postsSearch = createAsyncThunk(
	'search/handlePostsSearch',
	async (_,thunkAPI) => { 
        const searchStore = thunkAPI.getState().search
        return await Get(`search-posts/${searchStore.search}?cursor=${searchStore.postsCursor}`)
	}
)

export const searchSlice = createSlice({
    name: 'search',

    initialState: {
        search: '',
        loading: false,
        users: [],
        usersCursor: '',
        posts: [],
        postsCursor: '',
        show: false,
    },

    reducers: {
        setSearch: (state, {payload}) => {
            state.search = payload
        },
        setLoading: (state, {payload}) => {
            state.loading = payload
        },
        setShow: (state, {payload}) => {
            state.show = payload
        }
    },

    extraReducers: (builder) => {
        builder.addCase(usersSearch.fulfilled, (state, {payload})  => {
            if(!payload) return
            if(window.location.href.includes('/search/users/'))
                state.users = [...state.users,...payload.users]
            else  state.users = payload.users
                state.usersCursor = payload.nextCursor
        })
        .addCase(postsSearch.fulfilled, (state, {payload})  => {
            if(!payload) return
            state.posts = [...state.posts,...payload.posts]
            state.postsCursor = payload.nextCursor
        })
        .addMatcher(isPending(postsSearch),(state) => {state.loading = true})
		.addMatcher(isFulfilled(usersSearch, postsSearch),(state) => {state.loading = false})
    }
})

export const { setSearch, setLoading, setShow } = searchSlice.actions

export default searchSlice.reducer
