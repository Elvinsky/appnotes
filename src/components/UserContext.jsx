import {createContext, useCallback, useContext, useMemo, useState} from 'react';

const UserContext = createContext({
    user: {},
    setUser: () => {},
});

export const useUserContext = () => {
    return useContext(UserContext);
};

function UserContextProvider({children}) {
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'));
        } catch (e) {
            return {};
        }
    });

    const handleSetUser = useCallback((user) => {
        const userString = JSON.stringify(user);
        localStorage.setItem('user', userString);
        setUser(user);
    }, []);

    const value = useMemo(
        () => ({user, setUser: handleSetUser}),
        [user, handleSetUser]
    );
    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}

export default UserContextProvider;
