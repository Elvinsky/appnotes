import {useNavigate} from 'react-router-dom';

function BackButton({url}) {
    const navigate = useNavigate();
    const handleGoback = () => {
        navigate(url);
    };
    return (
        <button
            onClick={handleGoback}
            className="p-1 bg-red-200 hover:bg-red-300 border border-black"
        >
            Back
        </button>
    );
}

export default BackButton;
