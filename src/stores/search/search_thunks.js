import { createAsyncThunk } from '@reduxjs/toolkit'
import { Get } from '../../components/API/APIMethods'
import { setLoading } from './search_slice'

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