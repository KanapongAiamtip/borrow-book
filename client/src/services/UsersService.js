import Api from '@/services/Api'

export default {
    index(search) {
        return Api().get('users')
    },
    show(userId) {
        return Api().get('user/' + userId)
    },
    post(user) {
        return Api().post('user', user)
    },
    put(user) {
        return Api().put('user/' + user.id, user)
    },
    delete(user) {
        return Api().delete('user/' + user.id, user)
    },
    getFront() {
        return Api().get('users/front')
    }
}