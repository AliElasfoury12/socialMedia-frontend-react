import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { GET } from '../components/API/APIMethods'

export let getNotifications = createAsyncThunk(
	'Notiofications/getNotifications',
	async (page) => { 			
		return await GET('notifications?page=' + page)
	}
)

export let seen = createAsyncThunk(
	'Notiofications/seen',
	async () => { 			
		return await GET('notifications/seen')
	}
)

export let markAllAsRead = createAsyncThunk(
	'Notiofications/markAllAsRead',
	async () => { 			
		return await GET('notifications/mark-all-as-read')
	}
)

export let read = createAsyncThunk(
	'Notiofications/read',
	async (id) => { 
        await GET('notifications/mark-as-read/' + id)			
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