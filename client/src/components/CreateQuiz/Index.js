import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { Debug } from '../Debug';
import checkFieldError from '../../utils/check-field-error';
import QuizErrorsAlert from './QuizErrorsAlert';
import { addQuiz } from '../../services/QuizService';
import { ROUTES } from '../../utils/constants';

const schema = Yup.object().shape({
  title: Yup.string().trim().required('Title required'),
  questions: Yup.array()
  .of(
    Yup.object().shape({
      title: Yup.string().trim().required('Title required'),
      answers: Yup.array().of(
        Yup.object().shape({
          status: Yup.string().required('Required').oneOf(['0', '1']),
          value: Yup.string().trim().required('Answer required')
        })
      )
      .required('Must have an answer')
      .min(2, 'Must have at least 2 answers')
      .test(
        'at-least-1-correct-answer',
        d => `Must have at least one correct answer`,
        value => !!value.filter(answer => answer && answer.status === "1").length
      ),
    })
  )
  .min(1, 'Must have at least 1 question')
})

function CreateQuiz() {
    Modal.setAppElement('#root');
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [permalink, setPermalink] = useState(null);

    useEffect(() => {
        // Enable navigation prompt on page reload
        window.onbeforeunload = function() {
            return true;
        };
    }, []);

    let handleModalClose = function() {
        setModalOpen(false);
        navigate(`${ROUTES.QUIZZES}/${permalink.split('/')[4]}`);
    }

    let handleCopiedToClipboard = () => {
        toast.success('Copied to clipboard!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div>
            <Modal 
            isOpen={modalOpen} 
            onRequestClose={handleModalClose}
            className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white border border-2"
            overlayClassName="flex justify-center items-center fixed inset-0 bg-white/75"
            >
                <button className="absolute top-2 right-2 hover:bg-gray-200 rounded" onClick={handleModalClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                        <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                    </svg>
                </button>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold leading-tight tracking-wide">Success!</h2>
                <p className="flex-1 text-center text-gray-400">
                    Copy and share the link  <CopyToClipboard className='text-sky-500 underline cursor-pointer' text={permalink} onCopy={handleCopiedToClipboard}>
                        <span>{permalink}</span></CopyToClipboard> for people to take it!
                </p>
                <button type="button" className="px-8 py-3 font-semibold rounded-full bg-violet-400 text-gray-900" onClick={handleModalClose}>OK</button>
            </Modal>

            <ToastContainer position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover/>

            <Formik
            initialValues={{ 
                title: 'Sample quiz', 
                questions: [
                    {
                        "title": "",
                        "answers": [
                          {
                            "status": "1",
                            "value": ""
                          },
                          {
                            "status": "1",
                            "value": ""
                          }
                        ]
                      }
                ]
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    let response = await addQuiz(values);
                    setPermalink(response.data);
                    setModalOpen(true);
                } catch(e) {
                    console.log(e);
                } finally {
                    setSubmitting(false);
                }
            }}
            validationSchema={schema}
            >
            {({ isSubmitting, values, errors, touched, submitCount, validateForm, submitForm }) => (
                <Form className='lg:container mx-auto my-5'>
                    {submitCount > 0 && Object.keys(errors).length > 0 && <QuizErrorsAlert>
                        {errors.title && <li>Quiz title</li>}
                        {errors?.questions?.length > 0 && 
                        errors.questions.map((error, index) => { 
                            if(error) return <li key={index}>Question {index + 1}</li> 
                            return null;
                        })}
                    </QuizErrorsAlert>}

                    <div className="flex flex-wrap mx-3 mb-6 rounded-lg shadow-lg bg-white p-6">
                        <div className="w-full px-3">
                            <label 
                            className="tracking-wide mb-2" 
                            htmlFor="title">
                                Title
                            </label>
                            <Field 
                            className={`appearance-none block w-full text-gray-700 border ${touched.title && errors.title ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700`} id="title" name="title" type="text"/>
                            <ErrorMessage name="title" component="div" className='text-sm text-red-500'/>
                        </div>
                    </div>

                    <FieldArray
                        name="questions"
                        render={questionArrayHelpers => (
                        <>
                            <div>
                            {values.questions.map((question, questionIndex) => (
                                <div key={questionIndex} className={`mx-3 mb-6 rounded-lg shadow-lg bg-white p-6`}>
                                    <div className='mb-3'>
                                        <label htmlFor={`questions[${questionIndex}].title`}>
                                            {`Question ${questionIndex + 1}`}
                                        </label>
                                        <button 
                                        className={`${values.questions.length === 1 ? "text-slate-500 cursor-not-allowed" : "text-rose-500"} background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline`} 
                                        type="button"
                                        disabled={values.questions.length === 1}
                                        onClick={() => questionArrayHelpers.remove(questionIndex)}
                                        >
                                            Delete
                                        </button>
                                        <Field 
                                        name={`questions[${questionIndex}].title`} 
                                        className={`appearance-none block w-full text-gray-700 border ${checkFieldError(errors, touched, `questions[${questionIndex}].title`) ? "border-red-500" : "border-gray-200"} rounded py-3 px-4 mt-3 leading-tight focus:outline-none focus:bg-white focus:border-violet-700`} 
                                        id={`questions[${questionIndex}].title`}
                                        />
                                        <div className="text-sm text-red-500">
                                            {checkFieldError(errors, touched, `questions[${questionIndex}].title`)}
                                        </div>
                                    </div>

                                    <FieldArray name={`questions[${questionIndex}].answers`} render={ansArrayHelpers => (
                                        <>
                                            {values.questions[questionIndex].answers.length > 0 && (
                                                <>
                                                    <label htmlFor={`questions[${questionIndex}].answers[0]`}>Answers</label>
                                                </>
                                            )}
                                        {values.questions[questionIndex].answers.map((answer, ansIndex) => (
                                            <div key={ansIndex} className="mb-4">
                                                <div className="mt-1 relative rounded-md shadow-sm">
                                                    <div className="flex flex-wrap items-stretch w-full relative">
                                                        <div 
                                                        className={`flex px-4 border border-r-0 rounded rounded-r-none items-center leading-normal bg-red-50 whitespace-no-wrap text-grey-dark text-sm ${values.questions[questionIndex].answers.length > 2 ? 'cursor-pointer' : 'cursor-not-allowed'}`} 
                                                        onClick={() => {
                                                            if(values.questions[questionIndex].answers.length > 2) {
                                                                ansArrayHelpers.remove(ansIndex);
                                                            }
                                                        }}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                        </div>
                                                        <Field
                                                        type="text" 
                                                        id={`questions[${questionIndex}].answers[${ansIndex}]`}  
                                                        name={`questions[${questionIndex}].answers[${ansIndex}].value`} 
                                                        className={`appearance-none flex-shrink flex-grow flex-auto leading-normal w-px flex-1 h-12 px-4 py-3 focus:outline-none focus:bg-white focus:border-violet-700 relative border ${checkFieldError(errors, touched, `questions[${questionIndex}].answers[${ansIndex}].value`) ? "border-red-500" : "border-gray-200"}`} 
                                                        placeholder={`Answer ${ansIndex + 1}`}
                                                        />
                                                        <div className={`flex mr-px border rounded-r`}>
                                                            <label htmlFor={`questions[${questionIndex}].answers[${ansIndex}]`} className="sr-only">Answer</label>
                                                            <Field as="select" id={`questions[${questionIndex}].answers[${ansIndex}]`} name={`questions[${questionIndex}].answers[${ansIndex}].status`} className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md">
                                                                <option value={1}>Correct</option>
                                                                <option value={0}>Wrong</option>
                                                            </Field>
                                                        </div>	
                                                    </div>
                                                </div>
                                                <div className="text-sm text-red-500">
                                                    {checkFieldError(errors, touched, `questions[${questionIndex}].answers[${ansIndex}].value`)}
                                                </div>
                                            </div>                            
                                        ))}
                                        {
                                            errors.questions && errors.questions[questionIndex] && typeof errors.questions[questionIndex].answers === "string" &&
                                            <ErrorMessage name={`questions[${questionIndex}].answers`} component="div" className='text-sm text-red-500'/>
                                        }
                                        <button 
                                        type="button" 
                                        onClick={() => ansArrayHelpers.push({ status: '1', value: '' })}
                                        disabled={values.questions[questionIndex].answers.length === 5}
                                        className={`background-transparent font-bold uppercase py-1 text-xs outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:underline ${values.questions[questionIndex].answers.length === 5 ? 'cursor-not-allowed text-slate-500' : 'text-sky-500'}`}
                                        >
                                            Add answer
                                        </button>
                                        </>
                                    )}>
                                    </FieldArray>
                                </div>
                            ))}
                            </div>
                            <div className='pl-3'>
                                <button
                                    type="button"
                                    disabled={values.questions.length === 10}
                                    className={`background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1 hover:underline ease-linear transition-all duration-150 ${values.questions.length === 10 ? 'cursor-not-allowed text-slate-500': 'text-sky-500'}`}
                                    onClick={() => questionArrayHelpers.push({title: '', answers: [{ status: "1", value: "" }, { status: "1", value: "" }]})}
                                >
                                    Add Question
                                </button>

                                <button 
                                type="button" 
                                disabled={isSubmitting || !values.questions.length}
                                className={`shadow bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${isSubmitting || !values.questions.length ? 'bg-slate-400 cursor-not-allowed': 'hover:bg-purple-400'}`}
                                onClick={async () => {
                                    const result = await validateForm();
                                    if(Object.keys(result).length) {
                                        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                    }
                                    await submitForm();
                                }}
                                >
                                    Publish
                                </button>
                            </div>
                        </>
                        )}
                    />

                    {/* <Debug/> */}
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default CreateQuiz;