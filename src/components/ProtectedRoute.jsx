import {Navigate} from 'react-router-dom';
import {useUserContext} from './UserContext';

export const ProtectedRoute = ({children}) => {
    const {
        user: {email},
    } = useUserContext();
    if (!email) {
        // user is not authenticated
        return <Navigate to="/login" />;
    }
    return children;
};
