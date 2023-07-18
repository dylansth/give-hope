import React from 'react';
import { NavLink } from 'react-router-dom';
import Auth from '../utils/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import '../styles/style.css'


const TopNav = () => {

    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    return (
        <Container fluid>
            <Nav className="justify-between nav">
                <NavLink
                    activeClassName="bg-indigo-100"
                    className="hover:scale-105 text-lg font-medium text-black hover:text-gray-900 hover:bg-indigo-100 no-underline px-2 py-1 rounded-lg"
                    to="/"
                >
                    <Nav.Item className="">
                        Home
                    </Nav.Item>
                </NavLink>
                <NavLink
                    className="hover:scale-105 text-lg font-medium text-black hover:text-gray-900 hover:bg-indigo-100 no-underline px-2 py-1 rounded-lg"
                    to="/explore"
                >
                    <Nav.Item className="">
                        Explore
                    </Nav.Item>
                </NavLink>

                {Auth.loggedIn() ? (
                    <>
                        <div className='flex items-center gap-2 text-lg font-medium'>
                            <NavLink
                                className="text-black hover:scale-105 hover:text-gray-900 hover:bg-indigo-100 no-underline rounded-lg px-2 py-1"
                                to="/me"
                            >
                                <Nav.Item className="">
                                    My Profile
                                </Nav.Item>
                            </NavLink>
                            <NavLink
                                className="text-black hover:scale-105 hover:text-gray-900 hover:bg-indigo-100 no-underline rounded-lg px-2 py-1"
                                to="/create-fundraiser"
                            >
                                <Nav.Item className="">
                                    Create Fundraiser
                                </Nav.Item>
                            </NavLink>
                            <Nav.Item className="px-2 py-1 hover:scale-105 hover:bg-indigo-100 rounded-lg">
                                <button onClick={logout}>
                                    Logout
                                </button>
                            </Nav.Item>
                        </div>
                    </>
                ) : (
                    <>

                        <div className='flex items-center gap-2 text-lg font-medium'>
                            <NavLink
                                className="text-black px-2 py-1 hover:scale-105 hover:bg-indigo-100 rounded-lg no-underline"
                                to="/sign-in"
                            >
                                <Nav.Item>
                                    Sign In
                                </Nav.Item>


                            </NavLink>
                            <NavLink
                                className="text-black no-underline px-2 py-1 hover:scale-105 hover:bg-indigo-100 rounded-lg"
                                to="/sign-up"
                            >
                                <Nav.Item>
                                    Sign Up
                                </Nav.Item>


                            </NavLink>
                        </div>

                    </>
                )}
            </Nav>
        </Container>
    );
}

export default TopNav;
