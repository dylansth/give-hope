import React from 'react';
import { Link } from 'react-router-dom';

function TopNav() {
    const logout = (event) => {
        event.preventDefault();
        // Auth.logout();
        // For Auth helper & JWT integration.
      };
    return (
        <div>
            <navbar className="">
                <div>
                    <Link className="" to="/">
                        <p className="" style={{ fontSize: '1.5rem' }}>
                        Home
                        </p>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/explore">
                        <p className="" style={{ fontSize: '1.5rem' }}>
                            Explore
                        </p>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/sign-in">
                        <button className="" onClick="">
                        Sign In
                        </button>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/">
                    <button className="" onClick={logout}>
                        Log Out
                        </button>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/sign-up">
                    <button className="" onClick="">
                        Sign Up
                        </button>
                    </Link>
                </div>
            </navbar>
        </div>
    )
}

export default TopNav;