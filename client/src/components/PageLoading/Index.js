function PageLoading() {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-violet-400"></div>
            </div>
        </div>        
    )
}

export default PageLoading;