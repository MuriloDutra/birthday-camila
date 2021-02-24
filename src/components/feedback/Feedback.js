import React from 'react'
import './Feedback.scss'

function FeedBack(props){
    const { showMessage, isErrorMessage, message } = props
    
    return (
        <>
            {   showMessage && isErrorMessage && //Negative message
                <div className="message-container error">
                    <p>{message}</p>
                </div>
            }

            {   showMessage && !isErrorMessage && //Positive message
                <div className="message-container success">
                    <p>{message}</p>
                </div>
            }
        </>
    )
}

export default FeedBack