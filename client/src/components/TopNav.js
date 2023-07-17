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
        <Container fluid >
            <Nav className="justify-between">
                    <NavLink
                        className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                        to="/"
                    >
                <Nav.Item className="">
                        Home
                </Nav.Item>
                    </NavLink>
                    <NavLink
                        className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                        to="/explore"
                    >
                <Nav.Item className="">
                        Explore
                </Nav.Item>
                    </NavLink>

                {Auth.loggedIn() ? (
                    <>
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/me"
                            >
                        <Nav.Item className="w-full md:w-auto">
                                My Profile
                        </Nav.Item>
                            </NavLink>
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/create-fundraiser"
                            >
                            <Nav.Item className="w-full md:w-auto">
                                Create Fundraiser
                        </Nav.Item>
                            </NavLink>
                        <Nav.Item className="w-full md:w-auto">
                            <button onClick={logout}>
                                Logout
                            </button>
                        </Nav.Item>

                    </>
                ) : (
                    <>
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/sign-in"
                            >
                        <Nav.Item className="">
                                Sign In
                        </Nav.Item>
                            </NavLink>
                            <NavLink
                                className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
                                to="/sign-up"
                            >
                        <Nav.Item className="">
                                Sign Up
                        </Nav.Item>
                            </NavLink>
                    </>
                )}
            </Nav>
        </Container>
    );
}

export default TopNav;
