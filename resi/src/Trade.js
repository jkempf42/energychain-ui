import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, message } from 'antd';
import { Layout, Divider, Menu } from 'antd';
import { DatePicker, Space, Radio } from 'antd';
import { InputNumber } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';

import './css/App.css';

require('../node_modules/antd/lib/date-picker/style/index.css');
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
let offer = { date: "", amount: 0.0 };
const maxWholesaleRate = 1;

/*
 * Trade-display page for user to trade reserve.
 */
function Trade () {

    /*We need to initialize this here because userdb.selected is null on load.
     * Initialize with:
     * date = empty string
     * reserve = user's reserve (doesn't change until user does)
     * percent = 1 (i.e. sell 100% of reserve)
     * rate = sell at user's PPA rate
    */

    const reserve = userdb.selected.reserve;
    offer.amount = reserve

    const [value, setValue] = useState({rate: userdb.selected.ppaRate, percent: 1.00 } );

    /*These are for the side menu.*/

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

    const inputNumberOnChange = (v) => {
	console.log("rateSelect.rate:", value);

	if (v === null ) {
	    message.error("Please enter a number between " + userdb.selected.ppaRate + " and " + maxWholesaleRate + "!");
	    return;
	} else if (v > maxWholesaleRate ) {
	    message.error("The maximum rate is " + maxWholesaleRate);
	    return;
	} else if( v < userdb.selected.ppaRate ) {
	    message.error("The minimum rate is the PPA rate:" + userdb.selected.ppaRate);
	    return;
	}
	setValue({ rate:v, percent:value.percent });
    };

    const radioOnChange = (e) => {
	console.log("radioOnChange.percent:", e.target.value);
	setValue({ rate: value.rate, percent: e.target.value });
    };

    const dateOnChange = (d, dateString) => {
	offer.date = dateString;
    };

    const disabledDate = (current) => {
	// Can not select days before today and today
	return current && current.valueOf() < Date.now();
    };

    const buttonOnClick = () => {
	/*Check for errors first.*/
	if (offer.date === "" ) {
	    message.error("Please select a rate, amount, and date first!");
	    return;
	} else if ( value.percent === 0 ) {
	    message.success("Cancelling offer on " + offer.date + "!");
	    return;
	}

	let percent = value.percent
	let rate = value.rate

	offer.amount = percent * reserve;

	message.success("Your offer to sell " + offer.amount + " kwh on " + offer.date + " for " + rate + "$/kwh was sent to Energychain!", 10);

	console.log("buttonOnClick:value:", value);
	console.log("buttonOnClick:offer:",offer);
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
		    <p>Name: {userdb.selected.name} </p>
		    <p>Address: {userdb.selected.address} </p>
		    <p>Reserve: {userdb.selected.reserve +  " kwh"} </p>
		    <p>PPA Rate: {"$" + userdb.selected.ppaRate + "/kwh"} </p>
		</div>
		<Divider />
		<Content
		    style={{
			margin: '24px 16px',
			padding: 24,
			minHeight: 280,
		    }}
		>
		    <Layout >
			<div className="App-label">
			    <p>Please enter the rate, amount of reserve, and date to sell then press "Apply".</p>
			</div>
			<Space direction="horizontal">
			    <Button onClick={buttonOnClick} type="primary">Apply</Button>
			    <InputNumber min={userdb.selected.ppaRate}
					 max={maxWholesaleRate}
					 value={value.rate}
					 addonAfter="$/kwh"
			                 controls={false}
					 onChange={inputNumberOnChange}
					 type="number"
			    />
			    <Radio.Group
				onChange={radioOnChange}
				value={value.percent}
			    >
				<Radio value={0.0}>Cancel</Radio>
				<Radio value={0.25}>25%</Radio>
				<Radio value={0.50}>50%</Radio>
				<Radio value={0.75}>75%</Radio>
				<Radio value={1.00}>100%</Radio>
			    </Radio.Group>
			    <DatePicker
				onChange={dateOnChange}
				disabledDate={disabledDate}
				placement="bottomLeft"
			    />
			</Space>
		    </Layout>
		</Content>
	    </Layout>
	</Layout>
    );
}

export default Trade;

