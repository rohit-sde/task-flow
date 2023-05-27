import axios from 'axios'
import store from './store/store'
import * as actions from './store/actions/index'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST_BASE,
    mode: 'no-cors',
    validateStatus: function (status) {
        return true
        // return status >= 200 && status < 300; // default
    }
});

const axiosAuth = () => {
    // const auth = store.getState().auth
    getAccessToken()
    // return axios.create({
    //     baseURL: 'http://localhost:5000/api/v1/',
    //     mode: 'no-cors',
    //     validateStatus: function (status) {
    //         return true
    //         // return status >= 200 && status < 300; // default
    //     }
    // });
}

const getAccessToken = () => new Promise( (resolve, reject) => {
    const state = store.getState()
    console.log(state.auth)
    const updateStore = payload => {
        store.dispatch(actions.updateAuth(payload))
    }
    let isRefreshAccessTokenNeeded = true
    
    const accessToken = state.auth.accessToken
    if(accessToken){
        console.log(accessToken)
        resolve(3)
    }
    console.log(2)
    if(isRefreshAccessTokenNeeded){
        refreshAccessTokenFun()
            .then(res => {
                resolve({accessToken: res.accessToken, store, updateStore})
            })
            .catch(e => {
                console.log(e)
                reject()
            })
    }
} )
const refreshAccessTokenFun = () => new Promise( (resolve, reject) => {
    let token = localStorage.getItem('task-cutive-token')
    if(token){
        try{
            axios.post( process.env.REACT_APP_API_HOST_BASE + 'users/refreshToken', {refreshToken: token} )
            .then(res => {
                if(res.data.status){
                    let data = res.data.data
                    const {accessToken, refreshToken} = data
                    
                    store.dispatch( actions.updateAuth({
                        accessToken,
                        refreshToken
                    }) )

                    resolve( {accessToken, refreshToken} )
                }
                else{
                    console.log("Refresh ...")
                }
            })
        }
        catch(e){
            console.log('Axios error', e)
            reject()
        }
    }
    else{
        console.log('login first')
    }
})

export default axiosInstance
export {axiosAuth, getAccessToken}