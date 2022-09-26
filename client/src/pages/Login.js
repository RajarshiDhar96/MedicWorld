import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import { hideLoading, showLoading } from '../redux/alertsSlice'


function Login()
{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const onFinish= async(values)=>{
        try{
            dispatch(showLoading())
            const response=await axios.post('/api/user/login',values)
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message)
                toast("Redirecting to home page....")
                localStorage.setItem("token",response.data.data)
                navigate('/')
            }
            else{
                toast.error(response.data.message)
            }
       }
       catch(error)
       {
        dispatch(hideLoading())
            toast.error("Something went wrong: ",error)
       }
       
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