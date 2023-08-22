import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';


function Footer() {
    return (
        <div className='h-16 bg-blue-200 h-full flex justify-center items-center'>
            <a href='https://github.com/dylansth/give-hope' target='_blank' rel='noopener noreferrer'>
              <GitHubIcon className='text-black hover:text-gray-300 mx-2'/>
            </a>
            <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
              <InstagramIcon className='text-black hover:text-gray-300 mx-2'/>
            </a>
            <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
              <FacebookIcon className='text-black hover:text-gray-300 mx-2'/>
            </a>
      </div>
    )
}

export default Footer;