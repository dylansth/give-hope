import React from 'react';
import { Link, NavLink } from 'react-router-dom';
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
            <Nav className="justify-between md:justify-center space-x-4 py-4">
                <Nav.Item className="w-full md:w-auto">
                    <NavLink
                        className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                        to="/"
                    >
                        Home
                    </NavLink>
                </Nav.Item>
                <Nav.Item className="w-full md:w-auto">
                    <NavLink
                        className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                        to="/explore"
                    >
                        Explore
                    </NavLink>
                </Nav.Item>

                {Auth.loggedIn() ? (
                    <>
                        <Nav.Item className="w-full md:w-auto">
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/me"
                            >
                                My Profile
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item className="w-full md:w-auto">
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/create-fundraiser"
                            >
                                Create Fundraiser
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item className="w-full md:w-auto">
                            <button onClick={logout}>
                                Logout
                            </button>
                        </Nav.Item>

                    </>
                ) : (
                    <>
                        <Nav.Item className="w-full md:w-auto">
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/sign-in"
                            >
                                Sign In
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item className="w-full md:w-auto">
                            <Link
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/sign-up"
                            >
                                Sign Up
                            </Link>
                        </Nav.Item>
                    </>
                )}
            </Nav>
        </Container>
    );
}

export default TopNav;
