import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { base_url } from './stores/statices';
import { storage } from './utils/storage'

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 80,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    authEndpoint: base_url + 'api/broadcasting/auth',
    auth: {
        headers: {
            Authorization: `Bearer ${storage.get('token')}`
        },
    },
});
