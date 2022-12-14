import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { showLoading, hideLoading } from "../redux/alertsSlice"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorForm from '../components/DoctorForm'
import moment from "moment";

function BookAppointment() {
    const [isAvailable, setIsAvailable] = useState(false)
    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const params = useParams();
    const dispatch = useDispatch()
    const [doctor, setDoctor] = useState(null)
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate();


    const getDoctorData = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/doctor/get-doctor-info-by-id', { doctorId: params.doctorId }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(hideLoading())
            if (response.data.success) {

                setDoctor(response.data.data)

            }

        } catch (error) {

            dispatch(hideLoading())


        }
    }

    const checkAvailability = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/check-booking-availability',
                {
                    doctorId: params.doctorId,

                    date: date,
                    time: time
                },
                {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {

                toast.success(response.data.message)
                setIsAvailable(true)

            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error('Error booking appointment')
            dispatch(hideLoading())


        }
    }

    const bookNow = async () => {
        setIsAvailable(false)
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/user/book-appointment',
                {
                    doctorId: params.doctorId,
                    userId: user._id,
                    doctorInfo: doctor,
                    userInfo: user,
                    date: date,
                    time: time
                },
                {
                    headers:
                    {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {

                toast.success(response.data.message)

            }

        } catch (error) {
            toast.error('Error booking appointment')
            dispatch(hideLoading())


        }
    }

    useEffect(() => {


        getDoctorData()


    }, [])
    return (
        <Layout>
            {doctor && (
                <div>
                    <h1 className="page-title">{doctor.firstName} {doctor.lastName}</h1>
                    <hr />
                    <Row gutter={20} className="mt-5 ">
                        <Col span={8} sm={24} xs={24} lg={8}>
                            <h1 className="normal-text"><b>Timings: </b>{doctor.timings[0]}-{doctor.timings[1]}</h1>
                            <p ><b>Phone Number:</b> {doctor.phoneNumber}</p>
                            <p ><b>Address:</b> {doctor.address}</p>
                            <p ><b>Fees:</b> {doctor.feePerCunsultation}</p>

                            <div className='d-flex flex-column pt-2'>
                                <DatePicker format='DD-MM-YYYY' onChange={(value) => { setIsAvailable(false); setDate(moment(value).format('DD-MM-YYYY')) }} />
                                <TimePicker format='HH:mm' className='mt-3' onChange={(value) => { setIsAvailable(false); setTime(moment(value).format('HH:mm')) }} />
                                <Button className='primary-button mt-2 ' onClick={checkAvailability}>Check Availability</Button>
                                {isAvailable && (
                                    <Button className='primary-button mt-2' onClick={bookNow}>Book Now </Button>
                                )}


                            </div>
                        </Col>
                        <Col span={8} sm={24} xs={24} lg={8}>

                            <img className='border-logo' src='https://cdn-icons-png.flaticon.com/512/5511/5511414.png' width='300' height='300' />

                        </Col>
                    </Row>
                </div>
            )}




        </Layout>
    )
}

export default BookAppointment