import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import About from './routes/About';
import Layout from './routes/Layout';
import Login from './routes/Login';
import UserContextProvider from './components/UserContext';
import {ProtectedRoute} from './components/ProtectedRoute';
import Registration from './routes/Regisration';
import Notes from './routes/Notes';
import NoteDetails, {loader as NotesDetailsLoader} from './routes/NoteDetails';
import NoteEdit, {loader as NoteEditLoader} from './routes/NoteEdit';
import NoteCreate from './routes/NoteCreate';
import ErrorPage from './routes/ErrorPage';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Layout />
                </ProtectedRoute>
            ),
            children: [
                {
                    index: true,
                    element: <About />,
                },
                {
                    path: '/notes',
                    element: <Notes />,
                },
                {
                    path: '/notes/:id',
                    loader: NotesDetailsLoader,
                    element: <NoteDetails />,
                },
                {
                    path: '/notes/:id/edit',
                    loader: NoteEditLoader,
                    element: <NoteEdit />,
                },
                {
                    path: '/notes/new',
                    element: <NoteCreate />,
                },
                {
                    path: '*',
                    element: <ErrorPage />,
                },
            ],
        },

        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/registration',
            element: <Registration />,
        },
    ]);
    return (
        <UserContextProvider>
            <RouterProvider router={router} />
        </UserContextProvider>
    );
}

export default App;
