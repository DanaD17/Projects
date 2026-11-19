import '../HomePage/HomePage.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { FaBook } from 'react-icons/fa6';

export function HomePage() {
    const navigate = useNavigate();
    const [opening, setOpening] = useState(false);
    const token = localStorage.getItem('authToken');

    const handleCookbookClick = () => {
        setOpening(true);

        setTimeout(() => {
            navigate('/cookbook', { viewTransition: true });
        }, 1500);
    };

    const handleAccountClick = () => {
        setOpening(true);

         setTimeout(() => {
            navigate('/account', { viewTransition: true });
        }, 1500);

    }

    return (
        <section className="homepage">
            <div className={`book ${opening ? 'opening' : ''}`}>
                <div className="bottomCover"></div>

                <button className="homeRightRibbon cookbook" onClick={handleCookbookClick}>
                    <p>Cookbook</p> <FaBook />
                </button>

                {token != null ? (
                    <button className="homeRightRibbon account" onClick={handleAccountClick} >
                        <p>Account</p>
                        <MdAccountCircle />
                    </button>
                ) : (
                    <NavLink className="homeRightRibbon onLogin" to="/login" viewTransition>
                        <p>Login</p>
                        <MdAccountCircle />
                        
                    </NavLink>
                )}

                <div className="pages"></div>

                <div className="page"></div>

                <div className="spine"></div>

                <div className={`topCover ${opening ? 'opening' : ''}`}>
                    <div className="textBox">
                        <p>Hello There</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
