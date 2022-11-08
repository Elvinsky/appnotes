import {Suspense, useCallback, useMemo, useState} from 'react';
import {Await, useLoaderData, useNavigate, useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
import {getHTTPData, patchHTTP} from '../utils/requests';

export const loader = ({params: {id}}) => {
    // const notePromise = fetch(`http://localhost:5000/notes?id=${id}`).then(
    //     (r) => r.json()
    // );
    const notePromise = getHTTPData(`http://localhost:5000/notes?id=${id}`);
    return {notePromise};
};
function NoteEdit() {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const {id} = useParams();
    useMemo(() => {
        getHTTPData(`http://localhost:5000/notes/${id}`).then((note) => {
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
        const note = {
            title: title,
            body: body,
        };
        patchHTTP(`http://localhost:5000/notes/${id}`, note);
        navigate('/notes');
    };
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={notePromise}>
                {(note) => {
                    return (
                        <div className="p-1 border-t border-black">
                            <BackButton url={'/notes'} />
                            <div className="flex flex-col gap-1 mt-1">
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
