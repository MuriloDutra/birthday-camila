import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
        "Content-type": "application/json"
    }
})

axiosInstance.interceptors.request.use(config => {
    return config
})

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.log('Error: ', error)
        console.log('Error response: ', error)
    }
)

export const getPhotos = () => {
    return axiosInstance.get('getPhotos')
        .then(response => response.data)
}

export const getPhotoById = (id) => {
    return axiosInstance.get(`getPhotoById/${id}`)
        .then(response => response.data)
}

export const getApprovedPhotos = () => {
    return axiosInstance.get('getApprovedPhotos')
        .then(response => response.data)
}

export const getUnapprovedPhotos = () => {
    return axiosInstance.get('getUnapprovedPhotos')
        .then(response => response.data)
}

export const getHighlightPhotos = () => {
    return axiosInstance.get('getHighlightPhotos')
        .then(response => response.data)
}

export const sendPhotos = (body) => {
    return axiosInstance.post('sendPhotos', body)
        .then(response => response.data)
}

export const updatePhoto = (id) => {
    return axiosInstance.put(`updatePhoto/${id}`)
        .then(response => response.data)
}

export const deletePhoto = (id) => {
    return axiosInstance.delete(`deletePhoto/${id}`)
        .then(response => response.data)
}