import { getIn } from 'formik';

function checkFieldError(errors, touched, name) {
    const error = getIn(errors, name);
    const touch = getIn(touched, name);
    return touch && error ? error : null;
}

export default checkFieldError;