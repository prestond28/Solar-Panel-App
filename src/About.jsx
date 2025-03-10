import { BarsOutlined } from '@ant-design/icons';
import { doLogout } from './app';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { Drawer } from 'antd';
import { useState } from 'react';


function About() {
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
      <div className="body">
        <header>
        <nav className="nav">
          <BarsOutlined style={{ fontSize: '30px', cursor: 'pointer' }} onClick={showDrawer}/>
        </nav>
        </header>
        <div className="content">
          <Drawer title="Menu" onClose={onClose} open={openDrawer} placement="left">
            <Link to="/home" className='navlink'>home</Link>
            { localStorage.length ? <Link onClick={(e) => doLogout(e, navigate)} className="navlink">logout</Link> :
            <Link to="/login" className='navlink'>login</Link> }
          </Drawer>
          Info about my app
        </div>
        <div className="footer">
          <div className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></div>
        </div>
      </div>
    </>
  )
}

export default About
