import React from 'react';
import { Link } from 'react-router-dom';

function TopNav() {
    return (
        <div>
            <navbar className="">
                <div>
                    <Link className="" to="/">
                        <p className="" style={{ fontSize: '3rem' }}>
                        Home
                        </p>
                    </Link>
                </div>
                {/* <div>
                    <Link className="" to="/explore">
                        <p className="" style={{ fontSize: '3rem' }}>
                            Explore
                        </p>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/">
                        <button className="" onClick="">

                        </button>
                    </Link>
                </div>
                <div>
                    <Link className="" to="/">
                        <p className="" style={{ fontSize: '3rem' }}>

                        </p>
                    </Link>
                </div> */}
            </navbar>
        </div>
    )
}

export default TopNav;