import React from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function TopNav() {

    return (

                <Container>
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className="" to="/">
                                <p className="" style={{ fontSize: '1.5rem' }}>
                                    Home
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to="/explore">
                                <p className="" style={{ fontSize: '1.5rem' }}>
                                    Explore
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to="/sign-in">
                            <p className="" style={{ fontSize: '1.5rem' }}>
                                    Sign In
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to="/create-fundraiser">
                            <p className="" style={{ fontSize: '1.5rem' }}>
                                    Create Fundraiser
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to="/">
                            <p className="" style={{ fontSize: '1.5rem' }}>
                                    Sign Out
                                </p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="" to="/sign-up">
                            <p className="" style={{ fontSize: '1.5rem' }}>
                                    Sign Up
                                </p>
                            </Link>
                        </li>
                    </ul>
                </Container>
                

    )
}

export default TopNav;