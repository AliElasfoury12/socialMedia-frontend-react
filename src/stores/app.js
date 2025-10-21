import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',

    initialState: {
       showAlert: false,
       alertMessage: ''
    },

    reducers: {
        setShowAlert: (state, {payload}) => {
            state.showAlert = payload
        },
        Alert: (state, {payload}) => {
            state.alertMessage = payload
            state.showAlert = true
        }
    },

    extraReducers: () => {
    }
})

export const { setShowAlert, Alert } = appSlice.actions

export default appSlice.reducer
