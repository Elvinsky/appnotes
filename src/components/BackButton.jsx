import {useNavigate} from 'react-router-dom';

function BackButton({url}) {
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate(url);
    };
    return (
        <button
            onClick={handleGoback}
            className="p-1 bg-gray-200 hover:bg-green-200 border border-black"
        >
            Back
        </button>
    );
}

export default BackButton;
