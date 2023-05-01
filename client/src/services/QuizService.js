import * as axios from 'axios';
import { ROUTES } from '../utils/constants';

export function getAllQuizzes(page) {
    return axios.get(`${ROUTES.QUIZZES}${!isNaN(+page) ? `?page=${+page}` : ""}`);
}

export function addQuiz(quiz) {
    return axios.post(ROUTES.ADD_QUIZ, quiz);
}

export function getQuiz(quizId) {
    return axios.get(ROUTES.QUIZ.replace(':quizId', quizId));
}

export function deleteQuiz(quizId) {
    return axios.delete(ROUTES.QUIZ.replace(':quizId', quizId));
}