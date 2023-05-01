import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { ROUTES } from '../../utils/constants';
import { deleteQuiz } from '../../services/QuizService';

function QuizCard({ quiz, removeQuizFromList }) {
    const permalink = `http://localhost:3000/quizzes/${quiz.permalink}`;

    function handleDelete() {
        // Delete from backend
        deleteQuiz(quiz.permalink);
        // Remove from currently displayed list
        removeQuizFromList(quiz.permalink);
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

    return <>
            <div className="relative flex flex-col items-center max-w-lg gap-4 p-6 rounded-md shadow-md sm:py-8 sm:px-12 bg-white border border-2">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-violet-200">
                    {/* <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round"strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard text-lg" viewBox="0 0 16 16">
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-semibold leading-tight tracking-wide">{quiz.title}</h1>
                
                <p className="flex-1 text-center text-gray-500">Permalink: <CopyToClipboard 
                    className='text-sky-500 underline cursor-pointer' 
                    text={permalink} 
                    onCopy={handleCopiedToClipboard}>
                        <span>{permalink}</span>
                    </CopyToClipboard>

                </p>

                <p className="flex-1 text-center text-gray-500">Published at: {format(new Date(quiz.publishedAt), 'dd-MMM-yyyy HH:mm')}</p>

                <div className="flex mt-4 space-x-3 lg:mt-6">
                    <Link 
                    to={ROUTES.QUIZ.replace(':quizId', quiz.permalink)} 
                    className="inline-flex items-center py-2 px-4 text-sm text-center text-white font-bold bg-violet-400 rounded hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        View
                    </Link>
                    <button 
                    type="button" 
                    onClick={handleDelete} 
                    className="inline-flex items-center py-2 px-4 text-sm font-bold text-center text-white bg-rose-700 rounded border border-gray-300 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-gray-200">
                        Delete
                    </button>
                </div>
            </div>
    </>
}

export default QuizCard;