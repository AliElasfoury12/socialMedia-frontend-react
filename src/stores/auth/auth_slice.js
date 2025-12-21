import router from "../../Router"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { storage } from "../../utils/storage"
import { api } from "../../components/API/APIMethods"
import { checkOTP, findUserAndSendOTP, login, register, resendOTP, setNewPassword } from "./auth_thunks"

export const authSlice = createSlice({
	name: 'auth',

	initialState: {
		authUser: storage.get('user'),
		token: storage.get('token'),
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
		}, 
        logout: (state) => {
			state.authUser = null
			state.token = null
			storage.delete('user')
            storage.delete('token')
			api.setToken(null)
            router.navigate('/login')
		} 
	},

	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, {payload}) => {			
			storage.save('user', payload.user)
            storage.save('token', payload.token)
			state.authUser = payload.user
			state.token = payload.token
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

export const { setAuthUser, setToken, setErrors, logout} = authSlice.actions

export default authSlice.reducer