import React, { useState } from 'react'
import Consumer from '../../context/ApplicationContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCheckCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import './ImageContainer.scss'
import { approvePhotoById, unapprovePhotoById } from '../../services/request'


function ImageContainer(props){
    const [englishDescription, setEnglishDescription] = useState('')
    const [portugueseDescription, setPortugueseDescription] = useState('')
    const [imageName, setImageName] = useState('')

    const { photo, toggleFeedback, callback, approvedPhotos, unapprovedPhotos } = props


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


    function unapproveImage(imageId){
        unapprovePhotoById(imageId)
            .then(data => {
                console.log('data: ', data)
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
                                <button>{imageContainer.saveButton}</button>
                                {   approvedPhotos && 
                                    <button className="check-button" onClick={() => approveImage(photo.id)}>
                                        {imageContainer.approveButton}
                                        <FontAwesomeIcon icon={faCheckCircle} className="icon" />
                                    </button>
                                }

                                {   unapprovedPhotos && 
                                    <button className="uncheck-button" onClick={() => unapproveImage(photo.id)}>
                                        {imageContainer.unapproveButton}
                                        <FontAwesomeIcon icon={faTimes} className="icon" />
                                    </button>
                                }
                            </div>

                            <FontAwesomeIcon icon={faInfoCircle} className='icon-name' />
                            <p>{`${imageContainer.englishDescription}: ${photo.englishDescription || '-'}`}</p>

                            <p>{`${imageContainer.portugueseDescription}: ${photo.portugueseDescription || '-'}`}</p>

                            <p>{`${imageContainer.imageName}: ${photo.portugueseDescription || '-'}`}</p>
                        </div>
                    </div>
                )
            }}
        </Consumer>
    )
}


export default ImageContainer