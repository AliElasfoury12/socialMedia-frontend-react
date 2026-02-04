import router from "../../Router"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { storage } from "../../utils/storage"
import { api } from "../../components/API/APIMethods"
import { checkOTP, findUserAndSendOTP, GetNewAccessToken, login, logout, register, resendOTP, setNewPassword } from "./auth_thunks"

export const authSlice = createSlice({
	name: 'auth',

	initialState: {
		authUser: storage.get('user'),
		token: null,
		errors: {}, 
		loading: false,
	},

	reducers: {
		setAuthUser: (state, {payload}) => {
			if (payload) state.authUser = {...state.authUser, ...payload}
			else state.authUser = payload
			storage.save('user', state.authUser)
		},
		setToken: (state, {payload}) => {
			state.token = payload
		},
		setErrors: (state, {payload}) => {
			state.errors = payload
		}
	},

	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, {payload}) => {			
			storage.save('user', payload.user)
			state.authUser = payload.user
			state.token = payload.token
			api.setToken(payload.token)
            router.navigate('/')
		})
		.addCase(logout.fulfilled, (state) => {			
			state.authUser = null
			state.token = null
			storage.delete('user')
			api.setToken(null)
            router.navigate('/login')
		})
		.addCase(register.fulfilled, () => {
            router.navigate('/login')
		})
		.addCase(findUserAndSendOTP.fulfilled, (_, {payload}) => {
			router.navigate('/forgetPasswordOTP/' + payload.email)                
		})
		.addCase(checkOTP.fulfilled, (_, {payload}) => {
			router.navigate(`/setNewPassword/${payload.email}`)                
		})
		.addCase(setNewPassword.fulfilled, () => {
			router.navigate('/login')                
		})
		.addCase(GetNewAccessToken.fulfilled, (state, {payload}) => {
			state.token = payload.token 
			router.navigate(window.location.pathname)  
			state.loading = false                
		})
		.addCase(GetNewAccessToken.rejected, (state) => {
			state.loading = false
			router.navigate('/login')                               
		})
		.addMatcher(isFulfilled(login, register, findUserAndSendOTP, checkOTP, setNewPassword, resendOTP) ,(state) => {
			state.loading = false
		})
		.addMatcher(isPending(login, register, findUserAndSendOTP, checkOTP, setNewPassword, resendOTP, GetNewAccessToken) ,(state) => {
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