import { useContext } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { ROUTES } from '../../utils/constants';
import { SigninService } from '../../services/AuthService';
import AuthContext from '../AuthContext';

const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(8, "Too short!"),
});

function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, setUser } = useContext(AuthContext);

    let from = location.state?.from?.pathname || "/";

    if(user?.isLoggedIn) {
        return <Navigate to={ROUTES.INDEX} />
    }

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign In</h1>
                        <p className="text-sm text-gray-400">Sign in to access your account</p>
                    </div>
                    <Formik
                    initialValues={{
                        "email": "",
                        "password": ""
                    }}
                    validationSchema={SigninSchema}
                    validateOnChange={false}
                    onSubmit={async (values, { setErrors, setSubmitting }) => {
                        try {
                            await SigninService(values);
                            setUser({ isLoggedIn: true });
                            navigate(from, { replace: true });
                        } catch(e) {
                            if(e.name === "AxiosError") {
                                setErrors(e.response.data);
                                setSubmitting(false);
                            }
                        }
                    }}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-12">
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block mb-2">Email address</label>
                                        <Field type="email" name="email" id="email" placeholder="user@email.com" className={`w-full px-3 py-2 border rounded-md ${touched.email && errors.email ? "border-red-500" : "border-gray-700"}`}/>
                                        {errors.email && <ErrorMessage name="email" component="div" className='text-sm text-red-500'/>}
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label htmlFor="password">Password</label>
                                        </div>
                                        <Field type="password" name="password" id="password" placeholder="*****" className={`w-full px-3 py-2 border rounded-md ${touched.password && errors.password ? "border-red-500" : "border-gray-700"}`}/>
                                        {errors.password && <ErrorMessage name="password" component="div" className='text-sm text-red-500'/>}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md text-gray-900 ${isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-violet-400"}`} disabled={isSubmitting}>Sign in</button>
                                    </div>
                                    <p className="px-6 text-sm text-center text-gray-400">Need an account?&nbsp;
                                        <Link rel="noopener noreferrer" to={ROUTES.SIGN_UP} className="hover:underline text-violet-400">Sign up</Link>.
                                    </p>
                                </div>
                            </Form>
                        )}
                    </Formik>                    
                </div>
            </div>
        </div>
    )
}

export default SignIn;