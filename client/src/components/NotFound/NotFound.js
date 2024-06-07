import React from 'react'
import { Link } from 'react-router-dom';
import "../../App.css";

const NotFound = () => {
  return (
    <div className='page notfound'>
      <div className='content'>
        <img src='/notfound.png' alt='notfound' />
        <Link to={"/"}>RETURN TO HOME</Link>
      </div>
    </div>
  )
}

export default NotFound