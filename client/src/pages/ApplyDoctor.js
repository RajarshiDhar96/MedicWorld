
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import {showLoading,hideLoading} from "../redux/alertsSlice"
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ApplyDoctor() {
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.user)
    const navigate=useNavigate();

    const onFinish=async(values)=>{
        try{
            dispatch(showLoading())
            const response=await axios.post('/api/user/apply-doctor-account',{...values,userId:user._id},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("token")}`
                }
            })
            dispatch(hideLoading())
            if(response.data.success)
            {
                toast.success(response.data.message)
               
                navigate('/')
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
    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <hr />
            <Form layout='vertical' onFinish={onFinish}>
                <h1 className="card-title">Personal Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="First-name" name="firstName" rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Last-name" name="lastName" rules={[{ required: true }]}>
                            <Input placeholder='Last Name' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Phone No" name="phoneNumber" rules={[{ required: true }]}>
                            <Input placeholder='Phone Number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Website" name="website" rules={[{ required: true }]}>
                            <Input placeholder='Website' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Address" name="address" rules={[{ required: true }]}>
                            <Input placeholder='Address' />
                        </Form.Item>
                    </Col>
                    
                </Row>
                {/* <hr/> */}
                <h1 className="card-title">Professional Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Specialization" name="specialization" rules={[{ required: true }]}>
                            <Input placeholder='Specialization' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Experience" name="experience" rules={[{ required: true }]}>
                            <Input placeholder='Experience' type='number' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Fees" name="feePerCunsultation" rules={[{ required: true }]}>
                            <Input placeholder='Fees' type='number' />
                        </Form.Item>
                    </Col>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label="Timings" name="timings" rules={[{ required: true }]}>
                            <TimePicker.RangePicker  />
                        </Form.Item>
                    </Col>
                    
                    
                </Row>
                <div className="d-flex justify-content-end">
                    <Button className='primary-button' htmlType='submit'>Submit</Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor