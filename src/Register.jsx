import { useState } from 'react'
import './index.css';
import { doRegister } from './app';
import { useNavigate, Link } from 'react-router-dom';
import { Drawer } from 'antd';
import { BarsOutlined } from '@ant-design/icons';

function Register() {
  
const navigate = useNavigate();

const [openDrawer, setOpenDrawer] = useState(false);
  
    const showDrawer = () => {
      setOpenDrawer(true);
    };
  
    const onClose = () => {
      setOpenDrawer(false);
    };

  return (
    <>
      <div className="body" id='bodyRegister'>
        <header>
        <nav className="nav">
          <BarsOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={showDrawer}/>
          <div className='title'>Welcome to a really basic solar app!</div>
        </nav>
        </header>
        <div className="content">
          <Drawer title="Menu" onClose={onClose} open={openDrawer} placement="left">
            <Link to="/home" className='navlink'>home</Link>
            <Link to="/about" className='navlink'>about</Link>
          </Drawer>
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
