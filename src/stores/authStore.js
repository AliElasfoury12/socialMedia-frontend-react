import { createAsyncThunk, createSlice, isRejected } from "@reduxjs/toolkit"
import { storage } from "../utils/storage"
import { api, Post } from "../components/API/APIMethods"
import router from "../Router"

export const login = createAsyncThunk(
	'auth/login', async (form, {rejectWithValue}) => {
		try {
			return await Post('auth/login', form)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const register = createAsyncThunk(
	'auth/register', async (form, {rejectWithValue}) => {
		try {
			return await Post('auth/register', form)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)


export const authSlice = createSlice({
	name: 'auth',

	initialState: {
		authUser: storage.get('user'),
		token: storage.get('token'),
		errors: {}
	},

	reducers: {
		setAuthUser: (state, {payload}) => {
			state.authUser = payload
		},
		setToken: (state, {payload}) => {
			state.token = payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, {payload}) => {
			state.authUser = payload.user
			state.token = payload.token
			storage.save('user', payload.user)
            storage.save('token', payload.token)
			api.setToken(payload.token)
            router.navigate('/')
		}).addCase(register.fulfilled, () => {
            router.navigate('/login')
		})
		.addMatcher(isRejected(login, register) ,(state, {payload}) => {
			state.errors = payload.errors
		})
	}
})

export const { setAuthUser, setToken } = authSlice.actions

export default authSlice.reducer