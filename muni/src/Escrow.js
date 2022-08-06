import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { Layout,  Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Line } from '@ant-design/plots';

import './css/App.css';
require('../node_modules/antd/lib/radio/style/index.css');
require('../node_modules/antd/lib/button/style/index.css');
require('../node_modules/antd/lib/message/style/index.css');
require('../node_modules/antd/lib/divider/style/index.css');
require('../node_modules/antd/lib/layout/style/index.css');
require('../node_modules/antd/lib/space/style/index.css');
require('../node_modules/antd/lib/menu/style/index.css');
require('../node_modules/rc-menu/assets/index.css');
require('../node_modules/antd/lib/input-number/style/index.css');
require('../node_modules/rc-input-number/assets/index.css');

const { Header, Sider, Content } = Layout;

let userdb = require('./utils/users.js');
let consumptiondb = require('./utils/energyUse.js');
const getEscrowAccountBalances = consumptiondb.funct03;


/*
 * Escrow-display graph of escrow account.
 */
function Escrow () {
    
    /*Get the customer accounts status*/
    let data =
	getEscrowAccountBalances(userdb.users);

    const config = {
	data,
	padding: 'auto',
	xField: 'date',
	yField: 'balance',
	tooltip: {
	    customContent: (title, data) => {
		if( title == null ) {
		    return `<div>title</div>`
		}

		let item = data[0].data;

		if ( item.pastDue ) {
		return `<div style="color: red">
                             <p style="text-align: center">${title}</p>
                             <p>balance: ${item.balance}</p>
                             <p>Past Due Deducted!</p>
                         </div>`;
		}

		return `<div>
                             <p style="text-align: center">${title}</p>
                             <p>balance: ${item.balance}</p>
		        </div>`;
	    }
	},
	label: {},
	xAxis: {
	    label: {
		autoHide: true,
		autoRotate: false,
	    },
	},
    };


    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    const sideMenuClick = (item, key, keyPath, domEvent) => {
//	console.log("sideMenuClick:", item, key, keyPath);
    };

    const sideMenuSelect = (item, key, keyPath, selectedKeys, domEvent) => {
	let k = item.key;
	
//	console.log("sideMenuSelect:", item, key, keyPath, selectedKeys);

	if ( k === '3' ) {
	    navigate("/");
	    return;
	} else if ( k === '2' ) {
	    navigate("/overview");
	    return;
	} else if (k === '1' ) {
	    navigate("/escrow");
	    return;
	} else {
	    message.error("Can't happen!");
	}
	
	
    };


    return (
	<Layout>
	    <Sider trigger={null} collapsible collapsed={collapsed}>>
	<div className="logo" />
	    <Menu
	    theme="dark"
	    mode="inline"
	    items={[
		{ key: '1',
		  label: 'Escrow',
		},
		{ key: '2',
		  label: 'Overview',
		},
		{ key: '3',
		  label: 'Logout',
		},
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
	<Content
	    className="site-layout-background"
	    style={{
		margin: '2px 20px',
		padding: 5,
		minHeight: 280,
	    }}
	    >
	    <div className="Billing-graph-title">
		Escrow Account Status
	    </div>
	    <Line    {...config}/>
	</Content>
	</Layout>
	</Layout>
    );
}

export default Escrow;

