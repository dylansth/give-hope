import React from 'react';
import { useLocation } from 'react-router-dom';

function NotFound() {
    let location = useLocation();
    return (
        <div className="card bg-white card-rounded w-50">
            <div className="card-header bg-dark text-center">
                <img src="images.png" alt="not found image" />
                <h1>
                    No match for <code>{location.pathname}</code>
                </h1>
            </div>
        </div>
    );
}

export default NotFound;