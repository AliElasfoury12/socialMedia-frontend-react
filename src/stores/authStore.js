import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
	name: 'auth',

	initialState: {
		authUser: JSON.parse(localStorage.getItem('user')) ?? '',
		token: localStorage.getItem('token') ?? null,
	},

	reducers: {
		setAuthUser: (state, {payload}) => {
			state.authUser = payload
		},

		setToken: (state, {payload}) => {
			state.token = payload
		},

		setEmailError: (state, {payload}) => {
			state.errors.email = payload
		},
	},
})

export const { setAuthUser, setToken, setEmailError } = authSlice.actions

export default authSlice.reducer