import { useState } from 'react'
import './index.css';
import { doLogin } from './app';
import { useNavigate, Link } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

function Login() {

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
      <div className="body" id='bodyLogin'>
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
          <div className="login">
            <div className="inputs-and-labels">
              <label htmlFor="username">Username:</label><input className="input-field" id="username" type="text" />
              <label htmlFor="password">Password:</label><input className="input-field" id="password" type="password" />
            </div>
            <div className="login-or-register">
              <button onClick={(e) => doLogin(e, navigate)}>Login</button>
              <Link to="/register" className='navlink'>Register</Link>
            </div>
            <Link to="/home" className='guest'>Continue as guest</Link>
          </div>
        </div>
        <div className="footer">
          <p className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></p>
        </div>
      </div>
    </>
  )
}

export default Login
