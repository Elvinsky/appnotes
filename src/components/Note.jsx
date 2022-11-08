import {useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import {deleteHTTP} from '../utils/requests';

function Note(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/notes/${props.id}`);
    };
    const handleDelete = useCallback(() => {
        deleteHTTP(`http://localhost:5000/notes/${props.id}`);
        navigate('/notes');
    }, [navigate, props.id]);

    const handleEdit = () => {
        navigate(`/notes/${props.id}/edit`);
    };
    return (
        <div className="flex gap-1 border border-black p-2 border-t transition-all duration-300 hover:scale-105">
            <div
                onClick={handleClick}
                className="flex justify-between flex-row gap-3 p-1    w-60"
            >
                <div className="flex flex-col gap-2">
                    <div>
                        <h2 className="text-2xl font-semibold">
                            {props.title}
                        </h2>
                    </div>
                    <div className="text-xl">{props.preview}</div>
                </div>
            </div>
            <div className="flex flex-col gap-2 justify-between m-1">
                <button
                    className="px-1 bg-gray-300 hover:scale-105 w-fit"
                    onClick={handleDelete}
                >
                    D
                </button>
                <button
                    className="px-1 bg-gray-300 hover:scale-105 w-fit"
                    onClick={handleEdit}
                >
                    E
                </button>
            </div>
        </div>
    );
}

export default Note;
