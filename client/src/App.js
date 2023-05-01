import { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./components/Home/Index";
import Layout from "./components/Layout/Index";
import NoMatch from "./components/NoMatch/Index";
import SignUp from "./components/SignUp/Index";
import SignIn from './components/SignIn/Index';
import AuthContext from "./components/AuthContext";
import PageLoading from './components/PageLoading/Index';
import { CheckIfAuthed } from './services/AuthService';
import { ROUTES } from './utils/constants';
import RequireAuth from './components/RequireAuth';
import CreateQuiz from './components/CreateQuiz/Index';
import QuizList from './components/QuizList/Index';
import FillQuiz from './components/FillQuiz/Index';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    CheckIfAuthed().then(response => {
      setUser(response.data);
    })
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser}}>
      {
        !user ? <PageLoading /> :
        <BrowserRouter>
          <Routes>
            <Route path={ROUTES.INDEX} element={<Layout />}>
              <Route index element={<Home />}/>
              <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
              <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
              <Route path={ROUTES.ADD_QUIZ} element={<RequireAuth>
                <CreateQuiz />
              </RequireAuth>}/>
              <Route path={ROUTES.QUIZZES} element={<RequireAuth>
                <QuizList/>
              </RequireAuth>}/>
              <Route path={ROUTES.QUIZ} element={<FillQuiz />}/>
              <Route path="*" element={<NoMatch />}/>
            </Route>
          </Routes>
        </BrowserRouter>    
      }
    </AuthContext.Provider>
  )
}

export default App;