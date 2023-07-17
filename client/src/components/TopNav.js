import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

function TopNav() {
  return (
    <Container fluid>
      <Nav className="justify-between md:justify-center space-x-4 py-4">
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/"
          >
            Home
          </Link>
        </Nav.Item>
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/explore"
          >
            Explore
          </Link>
        </Nav.Item>
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/sign-in"
          >
            Sign In
          </Link>
        </Nav.Item>
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/create-fundraiser"
          >
            Create Fundraiser
          </Link>
        </Nav.Item>
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/"
          >
            Sign Out
          </Link>
        </Nav.Item>
        <Nav.Item className="w-full md:w-auto">
          <Link
            className="text-2xl font-semibold text-black hover:text-gray-900 hover:bg-indigo-100 hover:no-underline px-4 py-2 rounded-lg"
            to="/sign-up"
          >
            Sign Up
          </Link>
        </Nav.Item>
      </Nav>
    </Container>
  );
}

export default TopNav;
