import { useNavigate} from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { Layout, Divider } from 'antd';

import './css/App.css';

require('../node_modules/antd/lib/message/style/index.css');
require('../node_modules/antd/lib/divider/style/index.css');
require('../node_modules/antd/lib/layout/style/index.css');
require('../node_modules/antd/lib/button/style/index.css');
require('../node_modules/antd/lib/form/style/index.css');


let userdb = require('./utils/users.js');
let users = userdb.users;

/*
 * Login-display login page
 */
function Login() {

    const navigate =useNavigate();
    
    const findUser = (values) => {
	let u  = users.get(values.username);

	if (u === undefined) {
	    message.error("No user named:" + values.username,3);
	    return false;
	} else if ( u.adminUser ) {
	    message.error("Muni users can't access customer portal",3);
	    return false;
	}

	userdb.selected = u;

	return true;

    };

    const onFinishFailed = (errorInfo) => {
	console.log('Login failed:', errorInfo);
    };
    
    return (
	<div className="App-login">
	    <Divider />
		<Layout className="site-layout">
			<Form
			    name="basic"
			    labelCol={{
				span: 8,
			    }}
			    wrapperCol={{
				span: 16,
			    }}
			    initialValues={{
				remember: true,
			    }}
			    onFinish={(values) => {
			      if( findUser(values) ) {
			        navigate("/billing");
			      }
			    }}
			    onFinishFailed={onFinishFailed}
			    autoComplete="off"
			>
			    <Form.Item
				label="User Name:"
				name="username"
				rules={[
				    {
					required: true,
					message: 'Please input your user name!',
				    },
				]}
			    >
				<Input />
			    </Form.Item>

			    <Form.Item
				label="Password:"
				name="password"
				rules={[
				    {
					required: true,
					message: 'Please input your password!',
				    },
				]}
			    >
				<Input.Password />
			    </Form.Item>

			    <Form.Item
				wrapperCol={{
				    offset: 8,
				    span: 16,
				}}
			    >
				<Button type="primary" htmlType="submit">
				    Submit
				</Button>
			    </Form.Item>
			</Form>
		</Layout>
		
	</div>
    );
}

export default Login;
