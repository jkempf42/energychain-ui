import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { Layout, Divider, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import './css/App.css';
import appPage from './TransactionsApp.png'

require('../node_modules/antd/lib/date-picker/style/index.css');
require('../node_modules/antd/lib/radio/style/index.css');
require('../node_modules/antd/lib/button/style/index.css');
require('../node_modules/antd/lib/message/style/index.css');
require('../node_modules/antd/lib/divider/style/index.css');
require('../node_modules/antd/lib/layout/style/index.css');
require('../node_modules/antd/lib/space/style/index.css');
require('../node_modules/antd/lib/menu/style/index.css');
require('../node_modules/rc-menu/assets/index.css');

const { Header, Sider, Content } = Layout;

let userdb = require('./utils/users.js');
let selection = { date: "", percent: 1.00, amount: 0.0 };

/*
 * Transactions-display page for user to view transactions.
 */
function Transactions () {

    /*We need to initialize this here because userdb.selection is null on load*/

    selection.reserve = userdb.selected.reserve;

    const [collapsed, setCollapsed] = useState(false);
    const navigate =useNavigate();

    const sideMenuClick = (item, key, keyPath, domEvent) => {
	console.log("sideMenuClick:", item, key, keyPath);
    };

    const sideMenuSelect = (item, key, keyPath, selectedKeys, domEvent) => {
	let k = item.key;
	
	console.log("sideMenuSelect:", item, key, keyPath, selectedKeys);

	if( k === '4' ) {
	    navigate("/");
	    return;
	} else if ( k === '3' ) {
	    navigate("/transactions");
	    return;
	} else if ( k === '2' ) {
	    navigate("/trade");
	    return;
	} else if (k === '1' ) {
	    navigate("/billing");
	    return;
	} else {
	    message.error("Can't happen!");
	}
	
    };

    return (
	<Layout>
	    <Sider trigger={null} collapsible collapsed={collapsed}>
		<div className="logo" />
		<Menu
		theme="dark"
		mode="inline"
		items={[
		    { key: '1',
		      label: 'Billing',
		    },
		    { key: '2',
		      label: 'Trade',
		    },
		    { key: '3',
		      label: 'Transactions',
		    },
		    { key: '4',
		      label: 'Logout',
		    }
		]}
		onClick={sideMenuClick}
		onSelect={sideMenuSelect}
		
		/>
	    </Sider>
	    <Layout className="site-layout">
		<Header className="site-layout-background"
		    style={{
			padding: 0,
		    }}
		>
		    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
			className: 'trigger',
			onClick: () => setCollapsed(!collapsed),
		    })}
		</Header>
		<Divider />
		<div className="App-label">
		    <p>Name: {userdb.selected.name}</p>
		    <p>Address: {userdb.selected.address}</p>
		    <p>Reserve: {userdb.selected.reserve +  " kwh"}</p>
		    <p> PPA Rate: {"$" + userdb.selected.ppaRate + "/kwh"}</p>
		</div>
		<Content
		    className="site-layout-background"
		    style={{
			margin: '24px 16px',
			padding: 24,
			minHeight: 280,
		    }}
		>
		    <Divider />
		    <Layout >
			<img src={appPage} className="App-transactions" alt="logo" />
		    </Layout>
		</Content>
	    </Layout>
	</Layout>
    );
}

export default Transactions;

