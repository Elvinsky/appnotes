import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../components/UserContext';

export default function About() {
    const {user} = useUserContext();
    const navigate = useNavigate();
    const handleViewNotes = useCallback(() => {
        navigate('/notes');
    }, [navigate]);
    return (
        <div className="flex flex-col gap-2 p-2 items-center border-t border-black">
            <h1 className="text-3xl">About me</h1>
            <div className="text-xl">
                e-mail: <span className="text-gray-500">{user.email}</span>
            </div>
            <div className="text-xl">
                First log in:{' '}
                <span className="text-gray-500">{user.createdAt}</span>
            </div>
            <button
                className="p-2 bg-gray-300 rounded text-lg  transition-all duration-300 hover:scale-125"
                onClick={handleViewNotes}
            >
                See my notes
            </button>
        </div>
    );
}
