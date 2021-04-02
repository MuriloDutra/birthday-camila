import React, { Component, createContext } from 'react'
import { portugueseLabels } from '../constants/portugueseLabels'
import { englishLabels } from '../constants/englishLabels'
import { LANGUAGE } from '../constants/sessionStorageKeys'


const { Provider, Consumer } = createContext()

class ApplicationContext extends Component{
    state = {
        language: englishLabels,
        currentLanguage: 'EN-US'
    }


    constructor(props){
        super(props)
        this.changeLanguage = this.changeLanguage.bind(this)
        sessionStorage.setItem(LANGUAGE, this.state.currentLanguage)
    }


    changeLanguage(newLanguage){
        if(newLanguage === 'PT-BR'){
            this.setState({language: portugueseLabels, currentLanguage: newLanguage})
        }else{
            this.setState({language: englishLabels, currentLanguage: newLanguage})
        }

        sessionStorage.setItem(LANGUAGE, newLanguage)
    }


    render(){
        let value = {
            language: this.state.language,
            changeLanguage: this.changeLanguage,
            currentLanguage: this.state.currentLanguage,
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