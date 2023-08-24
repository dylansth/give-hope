import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    annualSalary: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };


    // email validation using regex
    const isEmailValid = (email) => {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailRegex.test(email);
    };

    
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    if (!isEmailValid(formState.email)) {
      console.log('Invalid email format');
      return;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState, annualSalary: parseInt(formState.annualSalary) },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  // button - form
  const isFormValid = () => {
    return (
      formState.username &&
      formState.name &&
      formState.email &&
      formState.annualSalary  &&
      isEmailValid(formState.email)
    );
  };

  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <div>
        {data ? (
          <p>
            Success! Redirecting{' '}
            <Link to="/">Home</Link>
          </p>
        ) : (
          <form onSubmit={handleFormSubmit} className="w-80 max-w-md">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
              placeholder="Your username"
              name="username"
              type="text"
              value={formState.username}
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
              placeholder="******"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 mb-4"
              placeholder="Annual Salary"
              name="annualSalary"
              type="number"
              value={formState.annualSalary}
              onChange={handleChange}
              required
            />
            <div className='flex justify-center'>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600"
              style={{ cursor: 'pointer' }}
              type="submit"
            >
              Submit
            </button>
            </div>
            {!isFormValid() && (
  <p className="text-red-500 text-center p-2">Please fill in all the required fields before submitting.</p>
)}
          </form>
        )}

        {error && (
          <div className="my-3 p-3 bg-danger text-white">
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
