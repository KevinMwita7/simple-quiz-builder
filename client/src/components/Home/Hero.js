import { Link } from 'react-router-dom'
import CustomerSurvey from '../../undraw_customer_survey_re_v9cj.svg';
import { ROUTES } from '../../utils/constants';

function Hero() {
    return (
        <section>
            <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
                <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                    <h1 className="text-5xl font-bold leading-none sm:text-6xl">Get insights
                        <span className="text-violet-400"> quickly </span> with quizzer
                    </h1>
                    <p className="mt-6 mb-8 text-lg sm:mb-12">Easily create and share online forms and surveys
                        <br className='hidden md:inline lg:hidden' />
                        , and analyze responses in real-time. 
                    </p>
                    <br className="hidden md:inline lg:hidden"/>
                    <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                        <Link rel="noopener noreferrer" to={ROUTES.SIGN_UP} className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900">Get Started</Link>
                    </div>
                </div>
                <div className="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                    <img src={CustomerSurvey} alt="Customer survey" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
                </div>
            </div>

            <div className="md:mx-auto md:container px-4">
                <div className="pb-32 pt-16">
                    <div className="mx-auto">
                        <div className="flex flex-wrap flex-row-reverse items-center">
                            <div className="md:w-1/2 w-full lg:pl-20 md:pl-10 sm:pl-0 pl-0">
                                <div className="py-2 text-color">
                                    <h2 className="text-2xl lg:text-4xl">Create an online form as easily as creating a document </h2>
                                    <h3 className="text-lg lg:leading-7 md:leading-10 py-8">Select from multiple question types, customize values as easily as pasting a list and share quizzes easily to interested parties. </h3>
                                </div>
                            </div>
                            <div className="md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://cdn.tuk.dev/assets/templates/prodify/invoicing-system.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="to pb-32 md:pt-40">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center pb-12">
                            <div className="md:w-1/2 w-full xl:pr-20 md:pr-6">
                                <div className="py-2 text-color">
                                    <h2 className="text-2xl lg:text-4xl">Boost adoption of product and services</h2>
                                    <h3 className="text-lg  lg:leading-7 md:leading-10 py-4 md:py-8">Here at Quizzer we take special care of what your organization needs instead of selling you a mass market tool that takes a one size fits all approach.</h3>
                                </div>
                            </div>
                            <div className="md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://cdn.tuk.dev/assets/templates/prodify/ProductAdoption.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pb-32 pt-16">
                    <div className="mx-auto">
                        <div className="flex flex-wrap flex-row-reverse items-center">
                            <div className="md:w-1/2 w-full lg:pl-20 md:pl-10 sm:pl-0 pl-0">
                                <div className="py-2 text-color">
                                    <h2 className="text-2xl lg:text-4xl">Create and respond to surveys from anywhere </h2>
                                    <h3 className="text-lg lg:leading-7 md:leading-10 py-8">Access, create, and edit forms on-the-go, from screens big and small. Others can respond to your survey from wherever they are—from any mobile device, tablet, or computer. </h3>
                                </div>
                            </div>
                            <div className="md:w-1/2 w-full relative h-96 flex items-end justify-center">
                                <img className="absolute w-full h-full inset-0 object-cover object-center rounded-md" src="https://images.unsplash.com/photo-1589652717521-10c0d092dea9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="m-4 md:m-8">
                <div className="container p-4 mx-auto my-6 space-y-1 text-center">
                    <span className="text-xs font-semibold tracking-wider uppercase text-violet-400">shortcut to your dream quiz</span>
                    <h2 className="pb-3 text-3xl font-bold md:text-4xl">Create useful quizzes in minutes</h2>
                    <p>Get a jumpstart to creating your quizzes! With our fully equipped toolset you can get the structure of your quizzes done and distributed with just a couple of clicks.</p>
                </div>
                <div className="container grid justify-center gap-4 mx-auto lg:grid-cols-2 xl:grid-cols-4">
                    <div className="flex flex-col px-8 py-6">
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font text-gray-600">Customization</h2>
                        <p className="flex-1 mb-4 text-base leading-relaxed text-gray-500">Create a quiz for each use case and gather feedback as you see fit.</p>
                    </div>
                    <div className="flex flex-col px-8 py-6 lg:border-none xl:border-solid">
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font text-gray-600">Intelligent</h2>
                        <p className="flex-1 mb-4 text-base leading-relaxed text-gray-500">Use built-in intelligence to set response validation rules. For example, ensure that email addresses are properly formatted or that numbers fall within a specified range. </p>
                    </div>
                    <div className="flex flex-col px-8 py-6">
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font text-gray-600">Share</h2>
                        <p className="flex-1 mb-4 text-base leading-relaxed text-gray-500">It's easy to share forms with specific people or with a broad audience by embedding forms on your website or sharing the links on social media.</p>
                    </div>
                    <div className="flex flex-col px-8 py-6">
                        <h2 className="mb-2 text-lg font-semibold sm:text-xl title-font text-gray-600">Analyze</h2>
                        <p className="flex-1 mb-4 text-base leading-relaxed text-gray-500">Analyze results together without having to share multiple versions of the file. </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                <h1 className="text-5xl font-bold leading-none text-center">Sign up now</h1>
                <p className="text-xl font-medium text-center">Easily create and share online forms and surveys, and analyze responses in real-time!</p>
                <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-8">
                    <Link className="px-8 py-3 text-lg font-semibold rounded bg-violet-400 text-gray-900" to={ROUTES.SIGN_UP}>Get started</Link>
                </div>
            </div>

            <footer className="px-4 py-8 bg-gray-800 text-gray-400">
                <div className="container flex flex-wrap items-center justify-center mx-auto space-y-4 sm:justify-between sm:space-y-0">
                    <div className="flex flex-row pr-3 space-x-4 sm:space-x-8">
                        <div>
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white">Quizzer</span>
                        </div>
                        <ul className="flex flex-wrap items-center space-x-4 sm:space-x-8">
                            <li>
                                <Link rel="noopener noreferrer" to="#">Terms of Use</Link>
                            </li>
                            <li>
                                <Link rel="noopener noreferrer" to="#">Privacy</Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="flex flex-wrap pl-3 space-x-4 sm:space-x-8">
                        <li>
                            <Link rel="noopener noreferrer" to="#">Instagram</Link>
                        </li>
                        <li>
                            <Link rel="noopener noreferrer" to="#">Facebook</Link>
                        </li>
                        <li>
                            <Link rel="noopener noreferrer" to="#">Twitter</Link>
                        </li>
                    </ul>
                </div>
            </footer>
        </section>
    )
}

export default Hero;