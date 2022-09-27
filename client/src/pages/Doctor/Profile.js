import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout'
import { showLoading, hideLoading } from "../../redux/alertsSlice"
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import DoctorForm from '../../components/DoctorForm'

function Profile() {
  const dispatch = useDispatch();
  const params=useParams()
  const [doctor,setDoctor]=useState(null)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/doctor/update-doctor-profile', { ...values, userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)

        navigate('/')
      }
      else {
        dispatch(hideLoading())
        toast.error(response.data.message)
      }
    }
    catch (error) {
      toast.error("Something went wrong: ", error)
    }

  }

  const getDoctorData = async () => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/doctor/get-doctor-info-by-user-id',{userId:params.userId},  {
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

  useEffect(() => {

   
      getDoctorData()
    

  }, [])
  return (
    <Layout>
      <h1 className="page-title">Doctor Profile</h1>
      <hr />
      {doctor && <DoctorForm onFinish={onFinish} initialValues={doctor} />}
    </Layout>
  )
}

export default Profile