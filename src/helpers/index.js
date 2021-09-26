import { englishLabels } from "../constants/englishLabels"
import { portugueseLabels } from "../constants/portugueseLabels"
import { LANGUAGE } from "../constants/sessionStorageKeys"


export function findMessage(messageParam){
    let fallbackMessage = null
    const currentLanguage = sessionStorage.getItem(LANGUAGE)
    const isItAnError = (messageParam.search("error_") !== -1)
    var match = null

    if(currentLanguage === 'PT-BR'){
        fallbackMessage = isItAnError ? "Um erro desconhecido ocorreu " : 'Ação realizada com sucesso.'
        match = Object.values(portugueseLabels.messages).find((message) => message.value === messageParam)?.display
    }else if(currentLanguage === 'EN-US'){
        fallbackMessage = isItAnError ? "An unknown error happened " : 'Done.'
        match = Object.values(englishLabels.messages).find((message) => message.value === messageParam)?.display
    }

    if(match){
        return match
    }else{
        return fallbackMessage
    }
}


export function showRegularMessage(successMessage){
    const currentLanguage = sessionStorage.getItem(LANGUAGE)
    var message;

    if(currentLanguage === 'PT-BR'){
        message = successMessage ? 'Ação realizada com sucesso!' : 'Erro ao realizar a ação.'     
    }else if(currentLanguage === 'EN-US'){
        message = successMessage ? 'Successfully done!' : 'An error occurred.'
    }

    return message
}