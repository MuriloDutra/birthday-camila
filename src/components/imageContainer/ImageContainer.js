import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCheckCircle, faTimes, faTrash, faSave, faStar } from '@fortawesome/free-solid-svg-icons'
import './ImageContainer.scss'
import { approvePhotoById, disapprovePhotoById, deletePhoto, updatePhoto, highlightPhotoById, unhighlightPhotoById } from '../../services/request'


function ImageContainer(props){
    const [englishDescription, setEnglishDescription] = useState('')
    const [portugueseDescription, setPortugueseDescription] = useState('')
    const [imageName, setImageName] = useState('')

    const { photo, toggleFeedback, callback, approvedPhotos, disapprovedPhotos } = props


    function approveImage(imageId){
        approvePhotoById(imageId)
            .then(data => {
                console.log('data: ', data)
                toggleFeedback(false, 'Image success')
                callback()
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    function disapproveImage(imageId){
        disapprovePhotoById(imageId)
            .then(data => {
                console.log('data: ', data)
                toggleFeedback(false, 'Image success')
                callback()
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    function deleteImage(imageId){
        deletePhoto(imageId)
            .then(data => {
                console.log('Data: ', data)
                toggleFeedback(false, 'Image success')
                callback()
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    function updateImage(imageId){
        if(englishDescription === '' && portugueseDescription === '' && imageName === ''){
            toggleFeedback(true, 'Preencha pelo menos um campo para salvar a foto.')
            return
        }

        let body = {
            "englishDescription": englishDescription,
            "portugueseDescription": portugueseDescription,
            "imageName": imageName
        }

        updatePhoto(imageId, body)
            .then(data => {
                console.log('Data: ', data)
                toggleFeedback(false, 'Image success')
                callback()

                setEnglishDescription('')
                setPortugueseDescription('')
                setImageName('')
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    function highlightImage(imageId){
        highlightPhotoById(imageId)
            .then(data => {
                console.log('Data: ', data)
                toggleFeedback(false, 'Image success')
                callback()
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    function unhighlightImage(imageId){
        unhighlightPhotoById(imageId)
            .then(data => {
                console.log('Data: ', data)
                toggleFeedback(false, 'Image success')
                callback()
            })
            .catch(error => {
                toggleFeedback(true, 'Image error')
            })
    }


    return (
        <Consumer>
            {   context => {
                const { imageContainer } = context.language.components
                
                return (
                    <div key={photo.id} className="image-container">
                        <img src={photo.imageUrl} />
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