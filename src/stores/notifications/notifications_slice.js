import { createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { getNotifications, getNotificationscount, markAllAsRead, read, seen } from './notifications_thunks'

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