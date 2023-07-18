import React from 'react';


function Footer() {
    return (
        <footer>

            <div className='flex justify-center items-center'>

                <div className="social-icons w-14 pt-2">
                    <a href="https://www.facebook.com/givehopeglobal/" target="_blank" rel="noopener noreferrer">
                        <img src="/fb.png" alt="Facebook" />
                    </a>
                </div>
                <div className='pr-3 pl-3 font-bold '>
                    <p className='p-footer justify-center flex flex-wrap pt-2 '>Join us in making a difference. Together, we can create a brighter future. Your support matters!</p>
                </div>
                <div className="social-icons w-14 pt-2">
                    <a href="https://www.instagram.com/give__hope/?hl=en" target="_blank" rel="noopener noreferrer">
                        <img src="/ig.png" alt="Instagram" />
                    </a>
                </div>
            </div>
        </footer>

    )
}

export default Footer;