import React from 'react';

function Home() {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('test');
    };

    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input
                    id="loginEmail"
                    placeholder=""
                    onChange={() => {}}
                    value={''}
                />
                <label>Password</label>
                <input
                    id="loginPassword"
                    placeholder=""
                    onChange={() => {}}
                    value={''}
                />

                <button type='submit'>Log In</button>
            </form> */}
        </div>
    );
};

export default Home;