import { useEffect, useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { DATA_API } from './data.service';
import { doLogout } from './app';
import { Drawer, Table } from 'antd';
import { tableColumnsHomeDisplay } from './table-sturcture-template';
import { condenseDataMonthly, formatCurrency, formatData, formatDateOnly, reduceData } from './data-helpers';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { BarsOutlined } from '@ant-design/icons';



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

  // setting up data
  const formattedData = rawData ? formatData(rawData) : null;
  const formattedDateOnly = rawData ? formatDateOnly(rawData) : null;
  const monthlyData = formattedDateOnly ? Object.values(condenseDataMonthly(rawData)) : null;
  const costComparison = monthlyData ? reduceData(monthlyData) : null;

  //setting up drawer
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
            <Link to="/about" className='navlink'>about</Link>
            { localStorage.length ? <Link onClick={(e) => doLogout(e, navigate)} className="navlink">logout</Link> :
            <Link to="/login" className='navlink'>login</Link> }
          </Drawer>
          {console.log(costComparison)}
          <BarChart layout="vertical" width={730} height={250} data={costComparison}>
            <XAxis type="number" tickFormatter={formatCurrency}/>
            <YAxis type="category" dataKey="name" width={80} />
            <Tooltip formatter={(value) => formatCurrency(value)}/>
            <Bar dataKey="cost" barSize={50}>
              {costComparison ? costComparison.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#8884d8' : '#82ca9d'}
                />
              )) : null}
            </Bar>
          </BarChart>
          <BarChart width={730} height={250} data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthYear" />
            <YAxis width={75} tickFormatter={formatCurrency}/>
            <Tooltip formatter={(value) => formatCurrency(value)}/>
            <Legend />
            <Bar dataKey="costWithSolar" name="Cost With Solar" fill="#8884d8" />
            <Bar dataKey="potentialCostWithoutSolar" name="Potential Cost Without Solar" fill="#82ca9d" />
          </BarChart>
          <div>Daily breakdown for selected dates:</div>
          <Table dataSource={formattedData} columns={tableColumnsHomeDisplay} />
        </div>
        <div className="footer">
          <div className="author">Author: <a href="https://github.com/prestond28" target="_blank">Preston Davis</a></div>
        </div>
      </div>
    </>
  )
}

export default Home
