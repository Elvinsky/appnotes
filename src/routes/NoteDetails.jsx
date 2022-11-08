import {Suspense} from 'react';
import {Await, useLoaderData} from 'react-router-dom';
export const loader = ({params: {id}}) => {
    const notePromise = fetch(`http://localhost:5000/notes?id=${id}`).then(
        (r) => r.json()
    );
    return {notePromise};
};
function NoteDetails() {
    const {notePromise} = useLoaderData();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Await resolve={notePromise}>
                {(note) => {
                    return (
                        <div className="flex flex-col">
                            <div>{note[0].title}</div>
                            <div>{note[0].body}</div>
                        </div>
                    );
                }}
            </Await>
        </Suspense>
    );
}

export default NoteDetails;
