import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'

export function createContactService(name, phone) {
    return axios.post('/contacts', {
        name: name,
        phone: phone,
    })
}

export function getAllContactsService() {
    return axios.get('/contacts')
}

export function removeContactService(id) {
    return axios.delete(`/contacts/${id}`)
}
