import { createAsyncThunk } from '@reduxjs/toolkit'
import { Get } from '../../components/API/APIMethods'

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