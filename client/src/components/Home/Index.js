import { useContext } from 'react';
import Hero from "./Hero";
import AuthContext from "../AuthContext";
import QuizList from '../QuizList/Index';

function Home() {
    const { user } = useContext(AuthContext);

    return (
        <>
            {
                user?.isLoggedIn ? <QuizList/> : <Hero/>
            }
        </>
    )
}

export default Home;