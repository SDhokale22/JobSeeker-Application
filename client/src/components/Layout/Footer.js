import React, { useContext } from 'react';
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { Context } from '../../index';
import { Link } from 'react-router-dom';

const Footer = () => {
  const {isAuthentication} = useContext(Context);
  return (
   <footer className={isAuthentication ? "footerShow" : "footerHide"}>
    <div>&copy; All Rights Resereved by CodingWithSona</div>
      <div>
        <Link to={"/"} target='_blank'><FaFacebookF /></Link>
        <Link to={"/"} target='_blank'><FaYoutube /></Link>
        <Link to={"/"} target='_blank'><FaLinkedin /></Link>
        <Link to={"/"} target='_blank'><RiInstagramFill /></Link>
      </div>
   </footer>
  )
}

export default Footer