import axios from 'axios'

const apiInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    mode: 'no-cors',
    validateStatus: function (status) {
        return true
        // return status >= 200 && status < 300; // default
    }
});

export default apiInstance;