import * as axios from 'axios';
import { ROUTES } from '../utils/constants';

export function SignupService(data) {
    return axios.post(ROUTES.SIGN_UP, data)
}

export function SigninService(data) {
    return axios.post(ROUTES.SIGN_IN, data)
}

export function CheckIfAuthed() {
    return axios.get(ROUTES.IS_LOGGED_IN)
}