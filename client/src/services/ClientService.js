import Api from '@/services/Api'

export default {
    post(client) {
        return Api().post('user', client)
    }
}