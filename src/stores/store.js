import { configureStore } from '@reduxjs/toolkit'
import countrStore from './countrStore'
import postsStore from './postsStore'
import authStore from './authStore'
import commentStore from './commentStore'
import profileStore from './profileStore'
import NotificationsStore from './NotificationsStore'
import searchStore from './searchStore'

export let store = configureStore({
    reducer: {
        common: commentStore,
        posts: postsStore,
        comments: commentStore,
        auth: authStore,
        counter: countrStore,
        profile: profileStore,
        notifications: NotificationsStore,
        search: searchStore

    }
})