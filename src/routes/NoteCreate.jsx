import {useCallback, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useUserContext} from '../components/UserContext';
function NoteCreate() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [valid, setValid] = useState(true);
    const navigate = useNavigate();
    const {user} = useUserContext();
    const handleChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const handleChangeBody = useCallback((e) => {
        setBody(e.target.value);
    }, []);
    const handleSubmit = () => {
        if (!title || !body) {
            setValid(false);
            return;
        }
        fetch(`http://localhost:5000/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: Date.now().toString(),
                userId: user.id,
                title: title,
                body: body,
                createdAt: new Date().toLocaleDateString(),
            }),
        })
            .then((r) => r.json())
            .then(navigate('/notes'));
        return;
    };
    return (
        <div>
            <div className="flex flex-col gap-1">
                <input
                    placeholder="Title"
                    value={title}
                    onChange={handleChangeTitle}
                    className={
                        valid
                            ? 'bg-gray-200 w-fit p-1'
                            : 'bg-gray-200 w-fit p-1 border border-red-500'
                    }
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={handleChangeBody}
                    className={
                        valid
                            ? 'bg-gray-200 p-1 h-44'
                            : 'bg-gray-200 p-1 h-44 border border-red-500'
                    }
                />
            </div>
            <button
                onClick={handleSubmit}
                className="p-1.5 bg-green-200 mt-1 rounded transition-all duration-300 hover:bg-green-300 hover:scale-105"
            >
                Save changes
            </button>
        </div>
    );
}

export default NoteCreate;

//TODO:
//  1)Recent sort onLoad <Notes/>
//  2)Delete button Logic
//  3)Buttons images
//  4)Backdrop buttons
//  5)Code formatting

//PS:
//  1)Problem with big text in note previw. Solving:Creating another field in json "preview" with substring
