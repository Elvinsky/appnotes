import {Suspense, useCallback, useMemo, useState} from 'react';
import {Await, useLoaderData, useNavigate, useParams} from 'react-router-dom';

export const loader = ({params: {id}}) => {
    const notePromise = fetch(`http://localhost:5000/notes?id=${id}`).then(
        (r) => r.json()
    );
    return {notePromise};
};
function NoteEdit() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {id} = useParams();
    useMemo(() => {
        fetch(`http://localhost:5000/notes/${id}`)
            .then((r) => r.json())
            .then((note) => {
                setBody(note.body);
                setTitle(note.title);
            });
    }, [id]);
    const {notePromise} = useLoaderData();
    const navigate = useNavigate();

    const handleChangeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);
    const handleChangeBody = useCallback((e) => {
        setBody(e.target.value);
    }, []);
    const handleSubmit = () => {
        fetch(`http://localhost:5000/notes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                body: body,
            }),
        })
            .then((r) => r.json())
            .then(navigate('/notes'));
    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={notePromise}>
                {(note) => {
                    return (
                        <div>
                            <div className="flex flex-col gap-1">
                                <input
                                    value={title}
                                    onChange={handleChangeTitle}
                                    className="bg-gray-200 w-fit p-1"
                                />
                                <textarea
                                    value={body}
                                    onChange={handleChangeBody}
                                    className="bg-gray-200 p-1 h-44"
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
                }}
            </Await>
        </Suspense>
    );
}

export default NoteEdit;
