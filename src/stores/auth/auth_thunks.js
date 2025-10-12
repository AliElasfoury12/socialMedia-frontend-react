import { createAsyncThunk } from "@reduxjs/toolkit"
import { Patch, Post } from "../../components/API/APIMethods"

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
			return await Patch('auth/set_new_password', form)
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)