import axios from 'axios'
import store from './store/store'
import * as actions from './store/actions/index'
import Base64 from 'crypto-js/enc-base64'
import UTF8 from 'crypto-js/enc-utf8'

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_HOST_BASE,
    mode: 'no-cors',
    validateStatus: function (status) {
        return true
        // return status >= 200 && status < 300; // default
    }
});
const axiosAuth = (axiosCallback = (()=>{}) ) => {
    // const auth = store.getState().auth
    getAccessToken()
        .then(res => {
            console.log(res)

            axiosCallback(
                axios.create({
                    baseURL: process.env.REACT_APP_API_HOST_BASE,
                    mode: 'no-cors',
                    validateStatus: function (status) {
                        return true
                        // return status >= 200 && status < 300; // default
                    },
                    headers: {
                        Authorization: 'Bearer ' + res.accessToken
                    }
                }),
            res.store,
            res.updateStore)
        })
}
const getAccessToken = () => new Promise( (resolve, reject) => {
    const state = store.getState()
    // console.log(state.auth)
    const updateStore = payload => {
        store.dispatch(actions.updateAuth(payload))
    }
    let isRefreshAccessTokenNeeded = true
    
    const accessToken = state.auth.accessToken
    if(accessToken){
        let data = accessToken.split('.')[1]
        data = Base64.parse( data )
        data = UTF8.stringify( data )
        data = JSON.parse(data)
        // let lifeTime = data.exp -
        let now = Math.floor( Date.now() / 1000 )
        let diff = now - (data.exp - 10)
        console.log('Token due time: ' + diff)
        if(diff < 0){
            isRefreshAccessTokenNeeded = false
            resolve({accessToken, store, updateStore})
        }
    }
    if(isRefreshAccessTokenNeeded){
        refreshAccessToken()
            .then(res => {
                resolve({accessToken: res.accessToken, store, updateStore})
            })
            .catch(e => {
                console.log(e)
                reject()
            })
    }
} )
const refreshAccessToken = () => new Promise( (resolve, reject) => {
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
                    reject( res )
                }
            })
        }
        catch(e){
            // console.log('Axios error', e)
            reject( e )
        }
    }
    else{
        console.log('login first')
        reject('Login First.')
    }
})

export default axiosInstance
export {axiosAuth, refreshAccessToken}