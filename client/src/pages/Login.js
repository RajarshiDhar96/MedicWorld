import { Button, Form, Input } from 'antd'
import React from'react'
import { Link } from 'react-router-dom'


function Login()
{
    const onFinish=(values)=>{
        console.log("Received values of form: ", values);
    }


    return(
        <div className='authentication'>
            
           
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Login</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='password' type='password'/>
                    </Form.Item>
                    <Button htmlType='submit' className='primary-button mt-3'>Login</Button>
                    <Link className='login-link'  to='/register'>Click here to Register</Link>
                </Form>
            </div>

        </div>
    )
}

export default Login