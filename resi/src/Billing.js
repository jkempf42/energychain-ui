import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { message } from 'antd';
import { Layout, Divider, Menu } from 'antd';
import { Space, Button, InputNumber, Radio } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Column } from '@ant-design/plots';

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
const getYearlyEnergyUsage = consumptiondb.funct01;


/*
 * Billing-display page for billing.
 */
function Billing () {
    
    /*We need to initialize this here because userdb.selection is null on load*/
    let user = userdb.selected;

    const ret = getYearlyEnergyUsage(user);
    const data = ret[0];
    const pastDueMap = ret[1];


    /*Get current month's usage.*/
    const thisMonthsUsage = data[data.length - 1];
    let billingCharge = thisMonthsUsage.cost;

    function calculateMonthsCharge() {
	let ldx = data.length -1;
	for (let i = ldx - user.pastDueMonths; i < ldx; i++ ) {
	    billingCharge = billingCharge + data[i].cost;
	}

	return billingCharge;
    };

    const red = '#F4664A';
    const blue = '#5B8FF9';
    const green = '#01B700';


    const config = {
	data,
	xField: 'month',
	yField: 'cost',
	colorField: 'month',
	color: ({month}) => {
	    let lastMonth = thisMonthsUsage.month;

	    /*Return green for last month's cost, blue if no past due, red for past due*/
	    if ( month === lastMonth ) {
		return green;
	    } else if ( pastDueMap.get(month) ) {
		return red;
	    }

	    return blue;
	},
	label: {
	    position: 'middle',
	    // 'top', 'bottom', 'middle',
	    style: {
		fill: '#FFFFFF',
		opacity: 0.6,
	    },
	},
	xAxis: {
	    label: {
		autoHide: true,
		autoRotate: false,
	    },
	},
    };


    const [value, setValue] = useState({payOption: 1, payment: calculateMonthsCharge() });
    const [collapsed, setCollapsed] = useState(false);
    const navigate =useNavigate();

    const sideMenuClick = (item, key, keyPath, domEvent) => {
//	console.log("sideMenuClick:", item, key, keyPath);
    };

    const sideMenuSelect = (item, key, keyPath, selectedKeys, domEvent) => {
	let k = item.key;
	
//	console.log("sideMenuSelect:", item, key, keyPath, selectedKeys);

	if( k === '4' ) {
	    navigate("/");
	    return;
	} if ( k === '3' ) {
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

    function paymentOnClick(e) {
	message.success("You will now be transferred to your payment processor's site.",10);
	console.log("Payment apply-event:",e);
	console.log("Payment apply-value:",value);
    }

    function payOptionOnChange(e) {
	setValue({ payOption: e.target.value, payment: value.payment });
	console.log("Payment option selected:",e);

    }

    function paymentValueOnChange(v) {
	console.log("Payment amount input:",v);
	setValue({payOption: value.payOption, payment: v});
    }

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
	<p>PPA Rate: {"$" + userdb.selected.ppaRate + "/kwh"}</p>
	</div>
	<Divider />
	<Content
	style={{
	    margin: '2px 20px',
	    padding: 5,
	    minHeight: 280,
	}}
	>
	<Layout>
	    <div >
		<p>Current charges for {thisMonthsUsage.month}:
		    ${value.payment}</p>
		{ user.pastDueMonths > 0 &&
		  <p className="PastDue">
		      Your account is past due. Your current charges include the past due amount.
		  </p>
		}
	    </div>
	    <Space direction="horizontal" align="center">
		<Button type="primary"
		    onClick={paymentOnClick}
		>Pay</Button>
		<div>
		    Pay Amount:
		</div>
		<InputNumber
		    value={value.payment}
		    controls={false}
		    formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
		    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
		    onChange={paymentValueOnChange}
		/>
		<div>
		    Payment Options:
		</div>
		<Radio.Group
		    onChange={payOptionOnChange}
		    value={value.payOption}
		>
		    <Radio value={1}>Credit Card</Radio>
		    <Radio value={2}>Venmo</Radio>
		    <Radio value={3}>Zelle</Radio>
		    <Radio value={4}>ACH Transfer</Radio>
		</Radio.Group>
	    </Space>
	</Layout>
	<Divider />
	<Layout>
	    <div className="Billing-graph-title">
		Energy Costs By Month
	    </div>
	    <Column {...config}/>
	</Layout>
		</Content>
	</Layout>
	</Layout>
    );
		}

export default Billing;

