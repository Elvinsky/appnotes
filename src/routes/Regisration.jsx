import {useCallback, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';

function Registration() {
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [passwordVaild, setPasswordValid] = useState(true);
    const [valid, setValid] = useState(true);
    const [error, setError] = useState();
    const navigate = useNavigate();

    const handleChangePassword = useCallback(
        (e) => setPassword(e.target.value),
        []
    );
    const handleChangeName = useCallback((e) => setName(e.target.value), []);
    const handleChangeEmail = useCallback((e) => setEmail(e.target.value), []);
    const handleChangeSecPassword = useCallback((e) => {
        setSecPassword(e.target.value);
    }, []);
    const handleRegister = () => {
        const user = {
            id: Date.now().toString(),
            email: email,
            password: password,
            name: name,
            createdAt: new Date().toLocaleDateString(),
        };
        if (!email || !name || !password || !secPassword) {
            return;
        }
        if (secPassword === password) {
            fetch(
                `http://localhost:5000/users?email=${email}&password=${password}`
            )
                .then((r) => r.json())
                .then((users) => {
                    if (users.length === 0) {
                        fetch('http://localhost:5000/users', {
                            method: 'POST',
                            body: JSON.stringify(user),
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }).then(() => {
                            navigate('/login');
                        });
                    } else {
                        setValid(false);
                        setPassword('');
                        setEmail('');
                        setSecPassword('');
                        setName('');
                    }
                });
        } else {
            setPasswordValid(false);
            setSecPassword('');
            setPassword('');
        }
    };
    useMemo(() => {
        if (!passwordVaild) setError('pass');
        if (!valid) setError('log');
    }, [passwordVaild, valid]);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col gap-2 w-fit border border-black m-auto mt-8 p-1 shadow-lg">
                <input
                    placeholder="e-mail"
                    className={
                        valid
                            ? 'w-fit bg-neutral-200 text-xl p-1'
                            : 'w-fit bg-neutral-200 text-xl p-1 border border-red-500'
                    }
                    onChange={handleChangeEmail}
                    value={email}
                ></input>
                <input
                    placeholder="name"
                    className={
                        valid
                            ? 'w-fit bg-neutral-200 text-xl p-1'
                            : 'w-fit bg-neutral-200 text-xl p-1 border border-red-500'
                    }
                    onChange={handleChangeName}
                    value={name}
                ></input>
                <input
                    placeholder="password"
                    className={
                        passwordVaild
                            ? 'w-fit bg-neutral-200 text-xl p-1'
                            : 'w-fit bg-neutral-200 text-xl p-1 border border-red-500'
                    }
                    type="password"
                    onChange={handleChangePassword}
                    value={password}
                ></input>
                <input
                    placeholder="repeat password"
                    type="password"
                    className={
                        passwordVaild
                            ? 'w-fit bg-neutral-200 text-xl p-1'
                            : 'w-fit bg-neutral-200 text-xl p-1 border border-red-500'
                    }
                    value={secPassword}
                    onChange={handleChangeSecPassword}
                ></input>
                <button
                    onClick={handleRegister}
                    className="bg-neutral-200 p-1 text-lg transition-all duration-300 hover:bg-green-300"
                >
                    Register
                </button>
            </div>
            <div
                className={
                    error
                        ? 'visible border border-red-500 mt-4 p-1 w-64'
                        : 'invisible'
                }
            >
                {error === 'log'
                    ? 'Login error. May be that user already exists'
                    : 'Unexpected error. Try check equality of both passwords'}
            </div>
        </div>
    );
}

export default Registration;
