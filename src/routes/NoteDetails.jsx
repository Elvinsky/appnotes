import {Suspense, useCallback} from 'react';
import {Await, useLoaderData, useNavigate, useParams} from 'react-router-dom';
import BackButton from '../components/BackButton';
export const loader = ({params: {id}}) => {
    const notePromise = fetch(`http://localhost:5000/notes?id=${id}`).then(
        (r) => r.json()
    );
    return {notePromise};
};
function NoteDetails() {
    const {id} = useParams();
    const navigate = useNavigate();
    const handleDelete = useCallback(() => {
        fetch(`http://localhost:5000/notes/${id}`, {method: 'DELETE'})
            .then((r) => r.json())
            .then(console.log);
        navigate('/notes');
    }, [id, navigate]);
    const handleEdit = useCallback(() => {
        navigate(`/notes/${id}/edit`);
    }, [id, navigate]);
    const {notePromise} = useLoaderData();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={notePromise}>
                {(note) => {
                    return (
                        <div className="p-1 border-t border-black">
                            <BackButton url="/notes" />
                            <div className="flex flex-col gap-1 ">
                                {/* <BackButton url="/notes" className="w-fit" /> */}
                                <div className="bg-gray-200 w-fit p-1 mt-1">
                                    {note[0].title}
                                </div>
                                <textarea
                                    className="bg-gray-200 p-1 h-44"
                                    readOnly
                                >
                                    {note[0].body}
                                </textarea>
                                <div className="text-sm text-gray-400">
                                    {note[0].createdAt}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        className="bg-gray-200 p-1 hover:bg-green-200 hover:scale-105"
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="bg-gray-200 p-1 hover:bg-green-200 hover:scale-105"
                                        onClick={handleEdit}
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Await>
        </Suspense>
    );
}

export default NoteDetails;
