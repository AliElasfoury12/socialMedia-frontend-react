import { createAsyncThunk, createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { Get } from '../components/API/APIMethods'

export const getNotifications = createAsyncThunk(
	'Notiofications/getNotifications',
	async (_, thunkAPI) => {
        const notifications_store = thunkAPI.getState().notifications
        const cursor = notifications_store.cursor
        if(cursor === null ) return
       return await Get('notifications?cursor=' + cursor)
    }
)

export const getNotificationscount = createAsyncThunk(
	'Notiofications/getNotificationsCount',
	async (_, thunkAPI) => {
        const notifications_store = thunkAPI.getState().notifications
        const cursor = notifications_store.cursor
        if(cursor === null ) return
        return await Get('notifications-count')
    }
)

export const seen = createAsyncThunk(
	'Notiofications/seen', async () => await Get('notifications/seen')
)

export let markAllAsRead = createAsyncThunk(
	'Notiofications/markAllAsRead', async () => await Get('notifications/mark-all-as-read')
)

export const read = createAsyncThunk(
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
        notificationsCount: null,
        show: false,
        loading: false,
        cursor: '',
    },

    reducers: {
        setNotifications:(state, {payload}) => {
            state.notifications.unshift(payload) 
        },

        setNotificationsCount:(state) => {
            state.notificationsCount++
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
            if(!payload) return

            state.notifications.push(...payload.notifications)
            state.cursor = payload.nextCursor            
        })
        .addCase(getNotificationscount.fulfilled, (state, {payload}) => {
            state.notificationsCount = payload.notifications_count
        })
        .addCase(seen.fulfilled, (state) => {
            state.notificationsCount = 0
        })
        .addCase(markAllAsRead.fulfilled, state => {
            state.notifications.map((n)=> n.read_at == 'read')
        })
        .addCase(read.fulfilled, (state,{payload}) => {
           const notification = state.notifications.find(n => n.id == payload)
           notification.read_at = 'read'
        })
        .addMatcher(isPending(getNotifications),(state) => {
			state.loading = true
		})
        .addMatcher(isFulfilled(getNotifications),(state) => {
			state.loading = false
		})
    }
})

export const { setNotifications, setNotificationsCount, setShow, setEnd, setLoading, setPage} = NotificationsSlice.actions

export default NotificationsSlice.reducer