import {useUserContext} from '../components/UserContext';
import {Suspense, useCallback} from 'react';
import Note from '../components/Note';
import {Await, useNavigate} from 'react-router-dom';
import {getHTTPData} from '../utils/requests';

function notesLoader(userId) {
    const notesPromise = getHTTPData(
        `http://localhost:5000/notes?userId=${userId}`
    );
    return {notesPromise};
}

function Notes() {
    const navigate = useNavigate();
    const handleAddNote = useCallback(() => {
        navigate('/notes/new');
    }, [navigate]);
    const {user} = useUserContext();
    const {notesPromise} = notesLoader(user.id);
    return (
        <div className="flex flex-col gap-1 items-center border-t border-black">
            <button
                className="bg-gray-200 text-3xl p-2 m-2 transition-all duration-300 hover:bg-green-200"
                onClick={handleAddNote}
            >
                Add Note
            </button>
            <div className="grid grid-cols-2 gap-3">
                <Suspense fallback={<div>Loading</div>}>
                    <Await resolve={notesPromise}>
                        {(notes) =>
                            notes.map((note) => (
                                <Note
                                    title={note.title}
                                    body={note.body}
                                    preview={note.body.substring(0, 15) + '...'}
                                    key={note.id}
                                    id={note.id}
                                />
                            ))
                        }
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default Notes;
