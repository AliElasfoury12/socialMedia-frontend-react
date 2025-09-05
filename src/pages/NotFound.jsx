import { Link, useNavigate } from "react-router-dom"
import { AlertCircle } from "lucide-react"

export default function NotFound () { 
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-16 bg-gray-200"> 
            <div className="text-center max-w-lg">
                <div className="mx-auto mb-8 h-20 w-20 rounded-2xl flex items-center justify-center bg-white shadow-md ring-1 ring-gray-200"> 
                    <AlertCircle className="h-10 w-10 text-gray-500" /> 
                </div>

                <p 
                    className="text-sm font-semibold tracking-wider uppercase text-gray-500">
                    Error 404
                </p>
                <h1 
                    className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                    Page Not Found
                </h1>
                <p 
                    className="mt-4 text-lg leading-7 text-gray-600">
                    The page you’re looking for doesn’t exist or may have been moved.
                </p>

                <div className="mt-10 flex items-center justify-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="rounded-2xl px-5 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-100 active:scale-[.98] transition">
                        Go Back
                    </button>
                    <Link
                        to="/"
                        className="inline-flex items-center rounded-2xl bg-black px-5 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 active:scale-[.98]">
                        Home
                        <span className="ml-2">&rarr;</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

