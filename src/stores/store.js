import { configureStore } from '@reduxjs/toolkit'
import postsStore from './posts/posts_slice'
import authStore from './auth/auth_slice'
import commentStore from './comments/comments_slice'
import profileStore from './profileStore'
import NotificationsStore from './notifications/notifications_slice'
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