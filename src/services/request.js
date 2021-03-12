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
        console.log('Error response: ', error.response)
        throw error
    }
)

//POST
export const login = (body) => {
    return axiosInstance.post('login', body)
        .then(response => response.data)
}

export const sendPhotos = (body) => {
    return axiosInstance.post('sendPhotos', body)
        .then(response => response.data)
}

//GET
export const getPhotos = () => {
    return axiosInstance.get('getPhotos')
        .then(response => response.data)
}

export const getPhotoById = (imageId) => {
    return axiosInstance.get(`getPhotoById/${imageId}`)
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

//PUT
export const updatePhoto = (imageId, body) => {
    return axiosInstance.put(`updatePhoto/${imageId}`, body)
        .then(response => response.data)
}

export const approvePhotoById = (imageId) => {
    return axiosInstance.put(`approvePhotoById/${imageId}`)
        .then(response => response.data)
}

export const unapprovePhotoById = (imageId) => {
    return axiosInstance.put(`unapprovePhotoById/${imageId}`)
        .then(response => response.data)
}

export const highlightPhotoById =(imageId) => {
    return axiosInstance.put(`highlightPhotoById/${imageId}`)
        .then(response => response.data)
}

export const unhighlightPhotoById =(imageId) => {
    return axiosInstance.put(`unhighlightPhotoById/${imageId}`)
        .then(response => response.data)
}

//DELETE
export const deletePhoto = (imageId) => {
    return axiosInstance.delete(`deletePhoto/${imageId}`)
        .then(response => response.data)
}