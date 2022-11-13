import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';

function ErrorPage() {
    const navigate = useNavigate();
    const handleRedirect = useCallback(
        (e) => {
            // console.log(e.target.id === 'notes');
            e.target.id === 'notes' ? navigate('/notes') : navigate('/');
        },
        [navigate]
    );
    return (
        <div className="flex flex-col gap-1 border border-black p-2 border-t ">
            <h1 className="text-xl">Unexpected error ocured.</h1>
            <div className="flex flex-row gap-2 ">
                <button
                    onClick={handleRedirect}
                    id="notes"
                    className="border border-black p-1 transition-all duration-300 hover:scale-105 hover:bg-green-200"
                >
                    Notes
                </button>
                <button
                    onClick={handleRedirect}
                    id="about"
                    className="border border-black p-1 transition-all duration-300 hover:scale-105 hover:bg-green-200"
                >
                    About
                </button>
            </div>
        </div>
    );
}

export default ErrorPage;
