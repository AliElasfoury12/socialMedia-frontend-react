import { configureStore } from '@reduxjs/toolkit'
import postsStore from './postsStore'
import authStore from './auth/auth_slice'
import commentStore from './commentStore'
import profileStore from './profileStore'
import NotificationsStore from './NotificationsStore'
import searchStore from './searchStore'

const errorMiddleware = () => next => action => {
    try {
        return next(action);
    } catch (err) {
        console.error("Redux error:", err);
        throw err
    }
}

export const store = configureStore({
    reducer: {
        common: commentStore,
        posts: postsStore,
        comments: commentStore,
        auth: authStore,
        profile: profileStore,
        notifications: NotificationsStore,
        search: searchStore
    },
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(errorMiddleware)
})