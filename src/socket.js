import {io} from 'socket.io-client'
import.meta.env.VITE_BACKEND_URL

export const initSocket = async ()=>{
    const options = {
        'force new connection': true,
        reconnectionAttempt: 'Infinity',
        timeout: 1000,
        // transports: ['websocket'],
    };
    console.log('Attempting to connect to:', import.meta.env.VITE_BACKEND_URL);
    return io(import.meta.env.VITE_BACKEND_URL, options);
};