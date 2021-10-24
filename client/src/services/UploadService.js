import Api from '@/services/Api'
export default {
    upload(formData) {
        return Api().post('upload', formData)
    },
    delete(picture) {
        return Api().post('/upload/delete', picture)
    }
}