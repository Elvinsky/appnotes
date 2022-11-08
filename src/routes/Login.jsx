import {useCallback, useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useUserContext} from '../components/UserContext';
import {getHTTPData} from '../utils/requests';

export default function Login() {
    const userContext = useUserContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [valid, setValid] = useState(true);

    const handleSetEmail = useCallback((e) => setEmail(e.target.value), []);

    const handleSetPassword = useCallback(
        (e) => setPassword(e.target.value),
        []
    );

    const handleLogin = useCallback(() => {
        getHTTPData(
            `http://localhost:5000/users?email=${email}&password=${password}`
        ).then((users) => {
            if (users.length === 1) {
                setValid(true);
                userContext.setUser(users[0]);
                setTimeout(() => {
                    navigate('/');
                }, 500);
            } else {
                setValid(false);
                setEmail('');
                setPassword('');
            }
        });
    }, [email, navigate, password, userContext]);

    useEffect(() => {
        if (userContext.user?.email) navigate('/');
    }, [navigate, userContext.user]);

    return (
        <div className="flex flex-col gap-2 w-fit border border-black m-auto mt-8 p-1 shadow-lg">
            <input
                placeholder="e-mail"
                onChange={handleSetEmail}
                value={email}
                className={
                    valid
                        ? 'w-fit bg-neutral-200 text-xl p-1'
                        : 'w-fit bg-neutral-200 text-xl p-1 border border-red-600'
                }
            />

            <input
                placeholder="password"
                onChange={handleSetPassword}
                value={password}
                type="password"
                className={
                    valid
                        ? 'w-fit bg-neutral-200 text-xl p-1'
                        : 'w-fit bg-neutral-200 text-xl p-1 border border-red-600'
                }
            />
            <div className="flex flex-col gap-1 items-start mt-5">
                <div className="flex flex-row gap-2 items-center">
                    <button
                        onClick={handleLogin}
                        className="bg-neutral-200 p-1 text-lg transition-all duration-300 hover:bg-green-300"
                    >
                        Log in
                    </button>
                    <div
                        className={
                            valid ? 'invisible' : ' border border-red-600 p-1'
                        }
                    >
                        Invalid password or email
                    </div>
                </div>
                <Link
                    to="/registration"
                    className="text-sm transition-all duration-300 hover:underline"
                >
                    Register
                </Link>
            </div>
        </div>
    );
}
