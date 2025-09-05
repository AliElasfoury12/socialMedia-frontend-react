import { createAsyncThunk, createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
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

export const findUserAndSendOTP = createAsyncThunk(
	'auth/find_user', async (form, {rejectWithValue}) => {
		try {
			const response =  await Post('auth/find_user_and_send_otp', form)
			return {...response, email: form.email}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const checkOTP = createAsyncThunk(
	'auth/check_otp', async (form, {rejectWithValue}) => {
		try {
			const response = await Post('auth/check-otp', form)
			return {...response, email: form.email}
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const resendOTP = createAsyncThunk(
	'auth/resend_otp', async (form, {rejectWithValue}) => {
		try {
			return await Post('auth/resend-otp', form)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const setNewPassword = createAsyncThunk(
	'auth/set_new_password', async (form, {rejectWithValue}) => {
		try {
			return await Post('auth/set_new_password', form)
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
		errors: {}, 
		loading: false
	},

	reducers: {
		setAuthUser: (state, {payload}) => {
			state.authUser = payload
		},
		setToken: (state, {payload}) => {
			state.token = payload
		},setErrors: (state, {payload}) => {
			state.errors = payload
		}
	},

	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, {payload}) => {
			state.authUser = payload.user
			state.token = payload.token
			storage.save('user', payload.user)
            storage.save('token', payload.token)
			api.setToken(payload.token)
            router.navigate('/')
		})
		.addCase(register.fulfilled, () => {
            router.navigate('/login')
		})
		.addCase(findUserAndSendOTP.fulfilled, (state, {payload}) => {
			router.navigate('/forgetPasswordOTP/' + payload.email)                
		})
		.addCase(checkOTP.fulfilled, (state, {payload}) => {
			router.navigate(`/setNewPassword/${payload.email}`)                
		})
		.addCase(setNewPassword.fulfilled, () => {
			router.navigate('/login')                
		})
		.addMatcher(isFulfilled(login, register, findUserAndSendOTP, checkOTP, setNewPassword, resendOTP) ,(state) => {
			state.loading = false
		})
		.addMatcher(isPending(login, register, findUserAndSendOTP, checkOTP, setNewPassword, resendOTP) ,(state) => {
			state.loading = true
		})
		.addMatcher(isRejected(login, register,findUserAndSendOTP, checkOTP, setNewPassword, resendOTP) ,(state, {payload}) => {
			state.loading = false
			state.errors = payload.errors
		})
	}
})

export const { setAuthUser, setToken, setErrors} = authSlice.actions

export default authSlice.reducer