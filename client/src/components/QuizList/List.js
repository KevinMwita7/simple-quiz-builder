import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import NoQuizFound from "./NoQuizFound";
import QuizCard from "./QuizCard";

function List({ quizzes }) {
    const [quizList,  setQuizList] = useState(quizzes);

    let removeQuizFromList = (permalink) => {
        setQuizList(quizList.filter(quiz => quiz.permalink !== permalink));
    } 

    return (
        <>
            {
                !quizList.length ? 
                <NoQuizFound />: 
                <div className="container mx-auto my-5 flex flex-wrap gap-5 justify-center lg:justify-start">
                    {quizList.map(quiz => <QuizCard quiz={quiz} key={quiz.permalink} removeQuizFromList={removeQuizFromList}/>)}
                    <ToastContainer position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover/>
                </div>
            }
        </>
    )
}

export default List;