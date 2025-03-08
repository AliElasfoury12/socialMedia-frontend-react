import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Get from '../components/API/Get'

export let getNotifications = createAsyncThunk(
	'Notiofications/getNotifications',
	async (page) => { 			
		return await Get('notifications?page=' + page)
	}
)

export let seen = createAsyncThunk(
	'Notiofications/seen',
	async () => { 			
		return await Get('notifications/seen')
	}
)

export let markAllAsRead = createAsyncThunk(
	'Notiofications/markAllAsRead',
	async () => { 			
		return await Get('notifications/mark-all-as-read')
	}
)

export let read = createAsyncThunk(
	'Notiofications/read',
	async (id) => { 
         await Get('notifications/mark-as-read/' + id)			
		return id
	}
)

export const NotificationsSlice = createSlice({
    name: 'Notifications',

    initialState: {
        notifications: [],
        notificationsCount: 0,
        show: false,
        end: false,
        loading: false,
        page: 1,
        lastPage: 0
    },

    reducers: {
        setNotifications:(state, {payload}) => {
            state.notifications.unshift(payload) 
        },

        setNotificationsCount:(state) => {
            state.notificationsCount += 1
        },

        setShow:(state, {payload}) => {
            state.show = payload
        },

        setEnd:(state, {payload}) => {
            state.end = payload
        },

        setLoading:(state, {payload}) => {
            state.loading = payload
        },

        setPage:(state) => {
            state.page +=1
        },

    },

    extraReducers: (builder) => {
        builder.addCase(getNotifications.fulfilled,(state, {payload}) => {
            if(payload.notifications == '') {
                state.end = true
                state.loading = false
            }else{
                state.notifications.push(...payload.notifications)
                state.notificationsCount = payload.notifications_count
                state.loading = false
                state.lastPage = state.page
            }
        })
        .addCase(seen.fulfilled, (state) => {
            state.notificationsCount = 0
        })
        .addCase(markAllAsRead.fulfilled, state => {
            state.notifications.map((n)=> n.read_at == 'read')
        })
        .addCase(read.fulfilled, (state,{payload}) => {
           let notification = state.notifications.find(n => n.id == payload)
           notification.read_at = 'read'
        })
    }
})

export const { setNotifications, setNotificationsCount, setShow, setEnd, setLoading, setPage} = NotificationsSlice.actions

export default NotificationsSlice.reducer