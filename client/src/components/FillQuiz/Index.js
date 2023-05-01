import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PageLoading from "../PageLoading/Index";
import { getQuiz } from "../../services/QuizService";
import NoQuizFound from './NoQuizFound';
import DisplayQuiz from './DisplayQuiz';

function FillQuiz() {
    const [quiz, setQuiz] = useState(null);
    const params = useParams();

    useEffect(() => {
        getQuiz(params.quizId)
        .then(res => {
            setQuiz(res.data);
        })
        .catch(err => console.log(err));
    }, [params.quizId]);

    return (
        <>
            {
                !quiz ? <PageLoading /> :
                !Object.keys(quiz).length ? <NoQuizFound /> :
                <DisplayQuiz quiz={quiz}/>
            }        
        </>
    )
}

export default FillQuiz;