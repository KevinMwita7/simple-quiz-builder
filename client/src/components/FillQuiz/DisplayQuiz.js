import { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { isEqual } from 'lodash';
import Modal from 'react-modal';
// import { Debug } from '../Debug';

function DisplayQuiz({ quiz }) {
    Modal.setAppElement("#root");
    const [markingResult, setMarkingResult] = useState([]);
    const [openResultsModal, setOpenResultsModal] = useState(false);

    const handleModalClose = function() {
        setOpenResultsModal(false);
    }

    return (
        <div>
            <Modal 
            isOpen={openResultsModal} 
            onRequestClose={handleModalClose}
            className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white border border-2"
            overlayClassName="flex justify-center items-center fixed inset-0 bg-white/75"
            >
                <button className="absolute top-2 right-2 hover:bg-gray-200 rounded" onClick={handleModalClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="flex-shrink-0 w-6 h-6">
                        <polygon points="427.314 107.313 404.686 84.687 256 233.373 107.314 84.687 84.686 107.313 233.373 256 84.686 404.687 107.314 427.313 256 278.627 404.686 427.313 427.314 404.687 278.627 256 427.314 107.313"></polygon>
                    </svg>
                </button>
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-violet-200">
                    {/* <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard text-lg" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                </div>
                <h2 className="text-2xl font-semibold leading-tight tracking-wide">Results!</h2>
                <p className="flex-1 text-center text-gray-400">
                    You answered {markingResult.filter(result => !!result).length}/{markingResult.length} correctly!
                </p>
                <button type="button" className="px-8 py-3 font-semibold rounded-full bg-violet-400 text-gray-900" onClick={handleModalClose}>OK</button>
            </Modal>
            
            <Formik
            initialValues={{ 
                // questions: quiz.Questions.map(question => question.Answers.map((answer, idx) => idx === 0 && question.Answers.length === 2))
                questions: quiz.Questions.map(question => {
                    if(question.Answers.length === 2) return [question.Answers[0].value];
                    return [];
                })
            }}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    // Extract answers from values returned from the server
                    const answerSheet = quiz.Questions
                        .map(question => question.Answers.filter(answer => answer.correct === "1"))
                        .map(answers => answers.map(answer => answer.value).sort());
                    // Sort answers from the user, that way they align with from the server
                    const userAnswers = values.questions.map(answers => answers.sort());
                    // Compare the answer sheet with the user answers
                    const result = userAnswers.map((ans, index) => isEqual(answerSheet[index], ans));
                    console.log(result);
                    setMarkingResult(result);
                    setOpenResultsModal(true);
                } catch(e) {
                    console.log(e);
                } finally {
                    setSubmitting(false);
                }
            }}
            // validationSchema={schema}
            >
            {({ isSubmitting, values, errors, touched, submitCount, validateForm, submitForm }) => (
                <Form className='lg:container mx-auto my-5'>
                    <div className="flex flex-wrap mb-6 rounded-lg bg-white p-6">
                        <div className="w-full">
                            <h1 className='text-5xl font-bold'>{quiz.title}</h1>
                        </div>
                    </div>

                    <>
                        <div>
                        {quiz.Questions.map((question, questionIndex) => (
                            <div key={questionIndex} 
                            className={`mx-3 mb-6 rounded-lg shadow-lg bg-white p-6
                            ${markingResult.length && markingResult[questionIndex] ? ' border-l-8 border-green-500' : markingResult.length && !markingResult[questionIndex] ? ' border-l-8 border-red-500' : ''}`}>
                                <div className='mb-3'>
                                    <h2 className='text-lg font-semibold mb-3'>{question.title}</h2>
                                    <p className='mb-2'>Answers</p>
                                    {
                                        question.correctAnswers.length > 2 && <small className='text-sky-500'> Tick all applicable</small>
                                    }
                                </div>
                                <div>
                                    {
                                        question.Answers.map((answer, ansIndex) => <label key={ansIndex} className="block" 
                                            htmlFor={`questions[${questionIndex}][${ansIndex}]`}>
                                                <Field 
                                                id={`questions[${questionIndex}][${ansIndex}]`}
                                                type={question.correctAnswers.length === 1 ? "radio" : "checkbox"}
                                                name={`questions[${questionIndex}]${question.correctAnswers.length === 1 ? '[0]' : ''}`}
                                                value={answer.value}
                                                className="w-4 h-4"
                                                />
                                            <span className='ml-2'>{answer.value}</span>
                                        </label>)
                                    }
                                </div>
                            </div>
                        ))}
                        </div>
                        <div className='pl-3'>
                            <button 
                            type="button" 
                            disabled={isSubmitting || !values.questions}
                            className={`shadow bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded ${isSubmitting || !values.questions ? 'bg-slate-400 cursor-not-allowed': 'hover:bg-purple-400'}`}
                            onClick={async () => {
                                const result = await validateForm();
                                if(Object.keys(result).length) {
                                    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                                }
                                await submitForm();
                            }}
                            >
                                Submit
                            </button>
                        </div>
                    </>

                    {/* <Debug/> */}
                </Form>
            )}
            </Formik>
        </div>
    )
}

export default DisplayQuiz;