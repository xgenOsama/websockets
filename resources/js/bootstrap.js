import 'bootstrap';
import Echo from "laravel-echo"
import Pusher from "pusher-js"
/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ?? `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
window.Echo = new Echo({
    broadcaster: 'pusher',
    authEndpoint: '/broadcasting/auth',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    wsHost: import.meta.env.VITE_PUSHER_HOST,           // Hostname or IP address (without path)
    //wsPort: 6001,
    wssPort: '443/ws',
    forceTLS: true,
    enabledTransports: ['ws', 'wss'],
    path: 'ws',
    disableStats: true,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
});

window.Echo.channel('messages')
    .listen('MessageSent', (e) => {
        console.log('Message:', e.message);
});

window.Echo.private(`user.1`)
    .listen('UserNotification', (e) => {
        console.log('Notification: ', e.message);
    });