import {NavLink, Outlet} from 'react-router-dom';
import {useUserContext} from '../components/UserContext';

export default function Layout() {
    const user = useUserContext();
    const handleLogOut = () => {
        user.setUser({email: ''});
    };
    return (
        <div className="flex flex-col gap-2 w-2/5 border border-black p-2 shadow-lg m-auto mt-7">
            <header className="text-3xl flex gap-8 items-center">
                <div className=" text-gray-600 mr-10">
                    Hello, {user.user.name}
                </div>
                <NavLink
                    to="/"
                    end={true}
                    className={({isActive}) => (isActive ? 'underline' : '')}
                >
                    About
                </NavLink>
                <NavLink
                    to="/notes"
                    end={true}
                    className={({isActive}) => (isActive ? 'underline' : '')}
                >
                    Notes
                </NavLink>
                <button
                    onClick={handleLogOut}
                    className="text-red-500 transition-all duration-300 hover:underline"
                >
                    Log out
                </button>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}
