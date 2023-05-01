import { useState, useEffect } from 'react';
import { getAllQuizzes } from '../../services/QuizService';
import PageLoading from '../PageLoading/Index';
import List from './List';

function QuizList() {
    let [quizzes, setQuizzes] = useState(null);

    useEffect(() => {
        getAllQuizzes()
        .then(response => setQuizzes(response.data))
        .catch(error => console.log(error))
    }, [])

    return (
        <>
            {
                !quizzes ? <PageLoading /> : 
                <List quizzes={quizzes}/>
            }
        </>
    )
}

export default QuizList;