import Api from '@/services/Api'
export default {
    index() {
        return Api().get('comments')
    },
    show(commentId) {
        return Api().get('comment/' + commentId)
    },
    post(comment) {
        return Api().post('comment', comment)
    },
    put(comment) {
        return Api().put('comment/' + comment.id, comment)
    },
    delete(comment) {
        return Api().delete('comment/' + comment.id, comment)
    },
    blog(blogId) {
        return Api().get('comment/blog/' + blogId)
    },
    user(userId) {
        return Api().get('comment/user/' + userId)
    }
}