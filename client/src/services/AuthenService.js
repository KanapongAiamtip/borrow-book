import Api from '@/services/Api'

export default {
    register(credentials) {
        return Api().post('register', credentials)
    },
    login(credentials) {
        return Api().post('login', credentials)
    },
    clientLogin(credentials) {
        return Api().post('front/login', credentials)
    }
}