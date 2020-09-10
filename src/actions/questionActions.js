import QuestionService from '../services/questionService'
import { responseToJson } from '../utils';

export const QuestionActionsType = {
    FETCH_REQUEST_QUESTIONS: "FETCH_REQUEST_QUESTIONS",
    FETCH_QUESTIONS_SUCCESS: "FETCH_QUESTIONS_SUCCESS",
    FETCH_QUESTIONS_ERROR: "FETCH_QUESTIONS_ERROR",

    ADD_QUESTION_REQUEST: 'ADD_QUESTION_REQUEST',
    ADD_QUESTION_SUCCESS: 'ADD_QUESTION_SUCCESS',
    ADD_QUESTION_ERROR: 'ADD_QUESTION_ERROR',

    UPDATE_QUESTION_RESPONSE_REQUEST: 'UPDATE_QUESTION_RESPONSE_REQUEST',
    UPDATE_QUESTION_RESPONSE_SUCCESS: 'UPDATE_RESPONSE_QUESTION_SUCCESS',
    UPDATE_QUESTION_RESPONSE_ERROR: 'UPDATE_QUESTION_RESPONSE_ERROR',

    UPDATE_QUESTION_STATUS_REQUEST: 'UPDATE_QUESTION_STATUS_REQUEST',
    UPDATE_QUESTION_STATUS_SUCCESS: 'UPDATE__STATUS_QUESTION_SUCCESS',
    UPDATE_QUESTION_STATUS_ERROR: 'UPDATE_QUESTION_STATUS_ERROR'
}

export function requestQuestions() {
    return {
        type: QuestionActionsType.FETCH_REQUEST_QUESTIONS,
    }
}

export function fetchQuestionsSuccess(questions) {
    return {
        type: QuestionActionsType.FETCH_QUESTIONS_SUCCESS,
        questions
    }
}

export function fetchQuestionsError(error) {
    return {
        type: QuestionActionsType.FETCH_QUESTIONS_ERROR,
        error
    }
}

export function fetchQuestions() {
    return dispatch => {
        dispatch(requestQuestions())
        return QuestionService.fetchQuestions()
            .then(response => responseToJson(response))
            .then(json => dispatch(fetchQuestionsSuccess(json)))
            .catch(error => {
                dispatch(fetchQuestionsError(error))
            })
    }
}

export function addQuestionRequest() {
    return {
        type: QuestionActionsType.ADD_QUESTION_REQUEST
    }
}

export function addQuestionSuccess() {
    return {
        type: QuestionActionsType.ADD_QUESTION_SUCCESS
    }
}

export function addQuestionError(error) {
    return {
        type: QuestionActionsType.ADD_QUESTION_ERROR,
        error
    }
}

export function addQuestion(question) {
    return dispatch => {
        dispatch(addQuestionRequest())
        return QuestionService.addQuestion(question)
            .then(response => responseToJson(response))
            .then(json => dispatch(addQuestionSuccess(json)))
            .catch(error => {
                console.log(error)
                dispatch(addQuestionError(error))
            })
    }
}

export function updateQuestionResponseRequest() {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_RESPONSE_REQUEST
    }
}

export function updateQuestionResponseSuccess(question) {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_RESPONSE_SUCCESS,
        question
    }
}

export function updateQuestionResponseError(error) {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_RESPONSE_ERROR,
        error
    }
}

export function updateResponse(id, doctorId, response) {
    return dispatch => {
        dispatch(updateQuestionResponseRequest())
        return QuestionService.updateResponse(id, doctorId, response)
            .then(response => responseToJson(response))
            .then(json => dispatch(updateQuestionResponseSuccess(json)))
            .catch(error => {
                console.log(error)
                dispatch(updateQuestionResponseError(error))
            })
    }
}

export function updateQuestionStatusRequest() {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_STATUS_REQUEST
    }
}

export function updateQuestionStatusSuccess(question) {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_STATUS_SUCCESS,
        question
    }
}

export function updateQuestionStatusError(error) {
    return {
        type: QuestionActionsType.UPDATE_QUESTION_STATUS_ERROR,
        error
    }
}

export function updateStatus(id, status) {
    return dispatch => {
        dispatch(updateQuestionStatusRequest())
        return QuestionService.updateStatus(id, status)
            .then(response => responseToJson(response))
            .then(json => dispatch(updateQuestionStatusSuccess(json)))
            .catch(error => {
                console.log(error)
                dispatch(updateQuestionStatusError(error))
            })
    }
}
