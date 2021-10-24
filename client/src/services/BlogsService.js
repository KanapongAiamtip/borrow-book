import Api from '@/services/Api'
export default {
    index(search) {
        return Api().get('blogs', {
            params: {
                search: search
            }
        })
    },
    show(blogId) {
        return Api().get('blog/' + blogId)
    },
    post(blog) {
        return Api().post('blog', blog)
    },
    put(blog) {
        return Api().put('blog/' + blog.id, blog)
    },
    delete(blog) {
        return Api().delete('blog/' + blog.id, blog)
    },
}