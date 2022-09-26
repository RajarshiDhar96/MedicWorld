import { Button, Form, Input } from 'antd'
import React from'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'


function Register()
{
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const onFinish=async(values)=>{
       try{
            dispatch(showLoading())
            const response=await axios.post('/api/user/register',values)
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message)
                toast("Redirecting to login page....")
                navigate('/login')
            }
            else{
                dispatch(hideLoading())
                toast.error(response.data.message)
            }
       }
       catch(error)
       {
            toast.error("Something went wrong: ",error)
       }
    }


    return(
        <div className='authentication'>
            
           
            <div className='authentication-form card p-3'>
                <h1 className='card-title'>Registration:</h1>
                <Form layout='vertical' onFinish={onFinish}>
                    <Form.Item label='Name' name='name'>
                        <Input placeholder='Name'/>
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input placeholder='email'/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input placeholder='password' type='password'/>
                    </Form.Item>
                    <Button htmlType='submit' className='primary-button mt-3'>Register</Button>
                    <Link className='login-link'  to='/login'>Click here to login</Link>
                </Form>
            </div>

        </div>
    )
}

export default Register