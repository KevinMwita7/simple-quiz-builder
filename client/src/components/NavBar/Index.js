import { useContext } from 'react';
import { Link } from "react-router-dom";
import NavLink from "./NavLink";
import { ROUTES } from '../../utils/constants';
import AuthContext from '../AuthContext';

function NavBar() {
    const { user } = useContext(AuthContext);
    
    return(
        <>
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-800">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link to={ROUTES.INDEX} className="flex items-center">
                    <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Quizzer</span>
                </Link>
                <div className="w-auto">
                    <ul className="flex md:space-x-8 mt-0 md:text-sm md:font-medium">
                        {
                            user?.isLoggedIn ? 
                            <>
                                <li>
                                    <NavLink to={ROUTES.INDEX}>Your quizzes</NavLink>
                                </li>
                                <li>
                                    <NavLink to={ROUTES.ADD_QUIZ}>Add quiz</NavLink>
                                </li>
                            </> :
                            <>
                                <li>
                                    <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
                                </li>
                                <li>
                                    <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
                                </li>
                            </>
                        }
                    </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar;