import axios from 'axios';

const api = axios.create({
    // passar as config
    baseURL: "http://localhost:3333"
})


export default api