import { useEffect } from 'react'
import { withRouter } from 'react-router-dom'


function ErrorPage(props){
    useEffect(() => {
        props.history.replace("/")
    }, [props.history])

    return null
}


export default withRouter(ErrorPage)