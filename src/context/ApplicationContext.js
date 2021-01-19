import React, { Component, createContext } from 'react'
import { portugueseLabels } from '../constants/portugueseLabels'
import { englishLabels } from '../constants/englishLabels'


const { Provider, Consumer } = createContext()

class ApplicationContext extends Component{
    state = {
        language: englishLabels,
    }


    constructor(props){
        super(props)
        this.changeLanguage = this.changeLanguage.bind(this)
    }


    changeLanguage(newLanguage){
        if(newLanguage === 'PT-BR'){
            this.setState({language: portugueseLabels})
        }else{
            this.setState({language: englishLabels})
        }
    }


    render(){
        let value = {
            language: this.state.language,
            changeLanguage: this.changeLanguage,
        }

        return (
            <Provider value={value}>
                { this.props.children }
            </Provider>
        )
    }
}


export { ApplicationContext }

// I make this default since it will probably be exported most often.
export default Consumer