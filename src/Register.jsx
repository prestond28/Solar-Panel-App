// import { useState } from 'react'
import './index.css';
import { doRegister } from './app';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  
const navigate = useNavigate();

  return (
    <>
      <div className="body">
        <header>
          <nav className="nav">
            <Link to="/home" className='navlink'>home</Link>
            <Link to="/about" className='navlink'>about</Link>
          </nav>
        </header>
        <div className="content">
          <div className="register">
            <div className="inputs-and-labels">
              <label htmlFor="username" className="input-field-label">Username:</label><input className="input-field" id="username" type="text" />
              <label htmlFor="email" className="input-field-label">Email:</label><input className="input-field" id="email" type="text" />
              <label htmlFor="password" className="input-field-label">Password:</label><input className="input-field" id="password" type="password" />
            </div>
            <div className="register-or-login">
              <button onClick={(e) => doRegister(e, navigate)}>Register</button>
              <Link to="/login" className='navlink'>Already have an account? Login</Link>
            </div>
          </div>
        </div>
        <div className="footer">
          <p className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></p>
        </div>
      </div>
    </>
  )
}

export default Register
