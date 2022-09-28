import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import moment from 'moment'
import React from 'react'

function DoctorForm({onFinish,initialValues}) {

  
  return (
    <Form layout='vertical' onFinish={onFinish} initialValues={{
        ...initialValues,
        ...(initialValues &&{
            timings:
            [
                moment(initialValues?.timings[0],'HH:mm'),
                moment(initialValues?.timings[1],'HH:mm'),
    
            ]
        })
        
    }}>
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
                <TimePicker.RangePicker format='HH:mm' />
            </Form.Item>
        </Col>
        
        
    </Row>
    <div className="d-flex justify-content-end">
        <Button className='primary-button' htmlType='submit'>Submit</Button>
    </div>
</Form>
  )
}

export default DoctorForm