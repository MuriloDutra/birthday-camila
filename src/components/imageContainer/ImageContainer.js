import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCheckCircle, faTimes, faTrash, faSave, faStar } from '@fortawesome/free-solid-svg-icons'
import './ImageContainer.scss'
import { approvePhotoById, disapprovePhotoById, deletePhoto, updatePhoto, highlightPhotoById, unhighlightPhotoById } from '../../services/request'
import { findMessage, showRegularMessage, showToast } from 'helpers'


function ImageContainer(props){
    const [englishDescription, setEnglishDescription] = useState('')
    const [portugueseDescription, setPortugueseDescription] = useState('')
    const [imageName, setImageName] = useState('')
    const { photo, handlePhotoUpdate, defaultCallback, approvedPhotos, disapprovedPhotos } = props


    function approveImage(imageId){
        approvePhotoById(imageId)
            .then(data => {
                showToast(findMessage(data.message), "success")
                defaultCallback()
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    function disapproveImage(imageId){
        disapprovePhotoById(imageId)
            .then(data => {
                showToast(findMessage(data.message), "success")
                defaultCallback()
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    function deleteImage(imageId){
        deletePhoto(imageId)
            .then(data => {
                showToast(findMessage(data.message), "success")
                defaultCallback()
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    function updateImage(imageId){
        if(englishDescription === '' && portugueseDescription === '' && imageName === ''){
            showToast('Preencha pelo menos um campo para salvar a foto.', "error")
            return
        }

        let body = {
            "englishDescription": englishDescription,
            "portugueseDescription": portugueseDescription,
            "imageName": imageName
        }

        updatePhoto(imageId, body)
            .then(data => {
                showToast(findMessage(data.message), "success")
                handlePhotoUpdate()

                setEnglishDescription('')
                setPortugueseDescription('')
                setImageName('')
            })
            .catch(error => {
                if(error.response && error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    function highlightImage(imageId){
        highlightPhotoById(imageId)
            .then(data => {
                showToast(findMessage(data.message), "success")
                handlePhotoUpdate()
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    function unhighlightImage(imageId){
        unhighlightPhotoById(imageId)
            .then(data => {
                showToast(findMessage(data.message), "success")
                handlePhotoUpdate()
            })
            .catch(error => {
                if(error.response.data.error){
                    showToast(findMessage(error.response.data.error), "error")
                }else{
                    showToast(showRegularMessage(false), "error")
                }
            })
    }


    return (
        <Consumer>
            {   context => {
                const { imageContainer } = context.language.components
                
                return (
                    <div key={photo.id} className="image-container">
                        <img src={photo.imageUrl} alt=""/>
                        <div className="image-form">
                            <label>{imageContainer.englishDescription}</label>
                            <input value={englishDescription} onChange={(text) => setEnglishDescription(text.target.value)} />

                            <label>{imageContainer.portugueseDescription}</label>
                            <input value={portugueseDescription} onChange={(text) => setPortugueseDescription(text.target.value)} />

                            <label>{imageContainer.imageName}</label>
                            <input value={imageName} onChange={(text) => setImageName(text.target.value)} />

                            <div>
                                <button className="save-button" onClick={() => updateImage(photo.id)}>
                                    {imageContainer.saveButton}
                                    <FontAwesomeIcon icon={faSave} className="icon" />
                                </button>

                                {   disapprovedPhotos && 
                                    <>
                                        <button className="check-button" onClick={() => approveImage(photo.id)}>
                                            {imageContainer.approveButton}
                                            <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                                        </button>

                                        <button className="trash-button" onClick={() => deleteImage(photo.id)}>
                                            {imageContainer.deleteButton}
                                            <FontAwesomeIcon icon={faTrash} className="icon" />
                                        </button>
                                    </>
                                }

                                {   approvedPhotos &&
                                    <>
                                        <button className="uncheck-button" onClick={() => disapproveImage(photo.id)}>
                                            {imageContainer.disapproveButton}
                                            <FontAwesomeIcon icon={faTimes} className="icon" />
                                        </button>

                                        {   photo.highlightImage === 0 &&
                                            <button className="star-button" onClick={() => highlightImage(photo.id)}>
                                                {imageContainer.highlightImageButton}
                                                <FontAwesomeIcon icon={faStar} className="icon" />
                                            </button>
                                        }


                                        {   photo.highlightImage === 1 &&
                                            <button className="unstar-button" onClick={() => unhighlightImage(photo.id)}>
                                                {imageContainer.unhighlightImageButton}
                                                <FontAwesomeIcon icon={faStar} className="icon" />
                                            </button>
                                        }
                                    </>
                                }
                            </div>

                            <FontAwesomeIcon icon={faInfoCircle} className='icon-name' />
                            <p>{imageContainer.englishDescription}: <span>{photo.englishDescription || '-'}</span></p>

                            <p>{imageContainer.portugueseDescription}: <span>{photo.portugueseDescription || '-'}</span></p>

                            <p>{imageContainer.imageName}: <span>{photo.imageName || '-'}</span></p>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default ImageContainer