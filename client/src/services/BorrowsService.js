import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('borrows', {
            params: {
                search: search
            }
        })
    },
    show(borrowId) {
        return Api().get('borrow/' + borrowId)
    },
    post(borrow) {
        return Api().post('borrow', borrow)
    },
    put(borrow) {
        return Api().put('borrow/' + borrow.id, borrow)
    },
    delete(borrow) {
        return Api().delete('borrow/' + borrow.id, borrow)
    },
}