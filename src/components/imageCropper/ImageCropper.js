import React, { useState, useCallback, Fragment } from 'react'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { findMessage, showRegularMessage, showToast } from 'helpers'
import { useTranslation } from 'react-i18next'
import Cropper from 'react-easy-crop'
import "./ImageCropper.scss"
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Button from '@material-ui/core/Button'

function ImageCropper(props) {
    //PROPS
    const { image, visible, onButtonClick } = { ...props }
    //STATE
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [croppedImage, setCroppedImage] = useState(null)

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(
                image,
                croppedAreaPixels,
                rotation
            )
            console.log('donee', { croppedImage })
            setCroppedImage(croppedImage)
            onButtonClick(croppedImage)
        } catch (e) {
            console.error(e)
        }
    }, [image, croppedAreaPixels, rotation])

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        console.log(croppedArea, croppedAreaPixels)
    }, [])

    const createImage = (url) =>
        new Promise((resolve, reject) => {
            const image = new Image()
            image.addEventListener('load', () => resolve(image))
            image.addEventListener('error', (error) => reject(error))
            image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
            image.src = url
        })

    function getRadianAngle(degreeValue) {
        return (degreeValue * Math.PI) / 180
    }

    /**
     * Returns the new bounding area of a rotated rectangle.
     */
    function rotateSize(width, height, rotation) {
        const rotRad = getRadianAngle(rotation)

        return {
            width:
                Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
            height:
                Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
        }
    }

    /**
     * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
     */
    async function getCroppedImg(
        imageSrc,
        pixelCrop,
        rotation = 0,
        flip = { horizontal: false, vertical: false }
    ) {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        if (!ctx) {
            return null
        }

        const rotRad = getRadianAngle(rotation)

        // calculate bounding box of the rotated image
        const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
            image.width,
            image.height,
            rotation
        )

        // set canvas size to match the bounding box
        canvas.width = bBoxWidth
        canvas.height = bBoxHeight

        // translate canvas context to a central location to allow rotating and flipping around the center
        ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
        ctx.rotate(rotRad)
        ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
        ctx.translate(-image.width / 2, -image.height / 2)

        // draw rotated image
        ctx.drawImage(image, 0, 0)

        // croppedAreaPixels values are bounding box relative
        // extract the cropped image using these values
        const data = ctx.getImageData(
            pixelCrop.x,
            pixelCrop.y,
            pixelCrop.width,
            pixelCrop.height
        )

        // set canvas width to final desired crop size - this will clear existing context
        canvas.width = pixelCrop.width
        canvas.height = pixelCrop.height

        // paste generated rotate image at the top left corner
        ctx.putImageData(data, 0, 0)

        // As Base64 string
        // return canvas.toDataURL('image/jpeg');

        // As a blob
        return new Promise((resolve, reject) => {
            canvas.toBlob((file) => {
                resolve(URL.createObjectURL(file))
            }, 'image/jpeg')
        })
    }

    async function getRotatedImage(imageSrc, rotation = 0) {
        const image = await createImage(imageSrc)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')

        const orientationChanged =
            rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270
        if (orientationChanged) {
            canvas.width = image.height
            canvas.height = image.width
        } else {
            canvas.width = image.width
            canvas.height = image.height
        }

        ctx.translate(canvas.width / 2, canvas.height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(image, -image.width / 2, -image.height / 2)

        return new Promise((resolve) => {
            canvas.toBlob((file) => {
                resolve(URL.createObjectURL(file))
            }, 'image/png')
        })
    }

    if (!visible) return null

    return (
        <div className='cropper-container'>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                aspect={1 / 1}
                rotation={rotation}
                onRotationChange={setRotation}
            />

            <Typography
                variant="overline"
            //classes={{ root: classes.sliderLabel }}
            >
                Zoom
            </Typography>
            <Slider
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-labelledby="Zoom"
                //classes={{ root: classes.slider }}
                onChange={(e, zoom) => setZoom(zoom)}
            />

            <Typography
                variant="overline"
            >
                Rotation
            </Typography>
            <Slider
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-labelledby="Rotation"
                onChange={(e, rotation) => setRotation(rotation)}
            />
            <Button
                onClick={showCroppedImage}
                variant="contained"
                color="primary"
            >
                Show Result
            </Button>
        </div>
    )
}

export default ImageCropper

/*export const classes = theme => ({
    cropContainer: {
        position: 'relative',
        width: '100%',
        height: 200,
        background: '#333',
        [theme.breakpoints.up('sm')]: {
            height: 400,
        },
    },
    cropButton: {
        flexShrink: 0,
        marginLeft: 16,
    },
    controls: {
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
        },
    },
    sliderContainer: {
        display: 'flex',
        flex: '1',
        alignItems: 'center',
    },
    sliderLabel: {
        [theme.breakpoints.down('xs')]: {
            minWidth: 65,
        },
    },
    slider: {
        padding: '22px 0px',
        marginLeft: 16,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'center',
            margin: '0 16px',
        },
    },
})*/
