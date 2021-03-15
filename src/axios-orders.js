import axios from 'axios';
const instance = axios.create({
    baseURL:
        'https://my-burger-b2d15-default-rtdb.firebaseio.com/',
});

export default instance;
