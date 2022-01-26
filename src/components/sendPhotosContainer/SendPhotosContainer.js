import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import './SendPhotosContainer.scss'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sendPhotos } from '../../services/request'
import { findMessage, showRegularMessage, showToast } from 'helpers'


function SendPhotosContainer(props){
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const { dashboardVersion, callback } = props


    function toBase64(file){
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => {reject(error)};
        });
    }


    function convertImagesToBase64(){
        let base64 = selectedPhotos.map((photo, index) => toBase64(photo).then(newPhoto => newPhoto))
        return Promise.all(base64)
    }


    function handleSubmit(){
        if(selectedPhotos.length === 0){
            showToast('Selecione pelo menos uma imagem.', "error")
            return
        }

        convertImagesToBase64()
            .then(convertedImages => {
                let body = {"imagesBase64": convertedImages}
                
                sendPhotos(body)
                    .then(data => {
                        showToast(findMessage(data.message), "success")

                        if(callback){
                            callback()
                        }
                        setSelectedPhotos([])
                    })
                    .catch(error => {
                        if(error.response.data.error){
                            showToast(findMessage(error.response.data.error), "error")
                        }else{
                            showToast(showRegularMessage(false), "error")
                        }
                    })
            })
    }


    return (
        <Consumer>
            {context => {
                const { sendPhotosContainer } = context.language.components

                return (
                    <div className="send-photos-container">
                        <h1>{   dashboardVersion
                                ? sendPhotosContainer.dashboardTitle
                                : sendPhotosContainer.sendPhotosTitle
                            }
                        </h1>

                        <div className="button-container">
                            {   selectedPhotos.length > 0 &&
                                <>
                                    <p className="selected-photos-title">{sendPhotosContainer.selectedPhotosTitle}: {selectedPhotos.length} - 10</p>
                                    <div className="selected-photos-container">
                                        {   selectedPhotos.map((photo, index) => (
                                            <p className="selected-photo">
                                                {index + 1} - {photo.name}
                                                <FontAwesomeIcon className="check-circle" icon={faCheckCircle} />
                                            </p>
                                        ))}
                                    </div>
                                </>
                            }
                            <input
                                type="file"
                                onChange={value => {
                                    if(selectedPhotos.length < 10 && (value.target.files[0] && value.target.files[0].name)){
                                        setSelectedPhotos([...selectedPhotos, value.target.files[0]])
                                    }
                                }}
                            />
                            <button onClick={handleSubmit}>{sendPhotosContainer.button}</button>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default SendPhotosContainer