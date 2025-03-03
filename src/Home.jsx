import { useEffect, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { DATA_API } from './data.service';
import { doLogout } from './app';
import { Table } from 'antd';
import { tableColumnsHomeDisplay } from './table-sturcture-template';



function Home() {
  const navigate = useNavigate();
  const [rawData, setRawData] = useState("");
  useEffect (() => {
    const _get = async (url) => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      return res.json();
    };
    
    _get(DATA_API).then((apiRes) => {
      // console.log(apiRes);
      setRawData(apiRes);
    });
  

  }, []);

  const dataSource = rawData;

  return (
    <>
      <div className="body">
        <header>
          <nav className="nav">
            <Link to="/about" className='navlink'>about</Link>
            { localStorage.length ? <Link onClick={(e) => doLogout(e, navigate)} className="navlink">logout</Link> :
            <Link to="/login" className='navlink'>login</Link> }
          </nav>
        </header>
        <div className="content">
          <Table dataSource={dataSource} columns={tableColumnsHomeDisplay} />
        </div>
        <div className="footer">
          <div className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></div>
        </div>
      </div>
    </>
  )
}

export default Home
