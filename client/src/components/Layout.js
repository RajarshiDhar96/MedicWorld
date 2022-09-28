import React, { useState } from 'react'
import '../layout.css'
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Badge } from 'antd'

function Layout({ children }) {
    const [collapsed, setCollapsed] = useState(false)
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();


    const location = useLocation();

    const userMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'https://cdn-icons-png.flaticon.com/512/619/619034.png'
        },
        {
            name: 'Appointments',
            path: '/appointments',
            icon: 'https://cdn-icons-png.flaticon.com/512/508/508765.png'
        },
        {
            name: 'Apply Doctor',
            path: '/apply-doctor',
            icon: 'https://cdn-icons-png.flaticon.com/512/5996/5996051.png'

        },
        {
            name: 'Profile',
            path: '/profile',
            icon: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'

        }

    ];

    const adminMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'https://cdn-icons-png.flaticon.com/512/619/619034.png'
        },
        {
            name: "Users",
            path: "/admin/userslist",
            icon: "https://cdn-icons-png.flaticon.com/512/1165/1165674.png"
        },
        {
            name: "Doctors",
            path: "/admin/doctorslist",
            icon: "https://cdn-icons-png.flaticon.com/512/3060/3060359.png"
        },


        {
            name: 'Profile',
            path: '/profile',
            icon: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'

        }

    ];

    const doctorMenu = [
        {
            name: 'Home',
            path: '/',
            icon: 'https://cdn-icons-png.flaticon.com/512/619/619034.png'
        },
        {
            name: 'Appointments',
            path: 'doctor/appointments',
            icon: 'https://cdn-icons-png.flaticon.com/512/508/508765.png'
        },
       
        {
            name: 'Profile',
            path: `/doctor/profile/${user?._id}`,
            icon: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png'

        }

    ];

    const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor?doctorMenu:userMenu;
    const role=user?.isAdmin ? "Admin" : user?.isDoctor?"Doctor":"User";
    const hideIcon = "https://cdn-icons-png.flaticon.com/512/812/812847.png"
    const notify = "https://cdn-icons-png.flaticon.com/512/1156/1156949.png"
    const logout = "https://cdn-icons-png.flaticon.com/512/4436/4436954.png"
    const logoIcon="https://cdn-icons-png.flaticon.com/512/3004/3004458.png"

    return (
        <div className='main'>
            <div className='d-flex layout'>
                <div className={`${collapsed ? 'collpased-sidebar' : 'sidebar'}`}>
                    <div className='sidebar-header'>
                          <h4 className='logo'>Medic World</h4>
                          {/* <img src={logoIcon} className="menu-item" /> */}
                          <h6 className='role'>{role}</h6>
                    </div>

                    <div className='menu'>
                        {menuToBeRendered.map((menu) => {
                            const isActive = location.pathname === menu.path
                            return <div className={`d-flex menu-item ${isActive && 'active-menu-item'}`}>
                                <img src={menu.icon} />
                                {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                            </div>
                        })}
                        <div className={`d-flex menu-item`} onClick={() => {
                            localStorage.clear()
                            navigate('/login')

                        }}>
                            <img src={logout} />
                            {!collapsed && <Link to="/login">Logout</Link>}
                        </div>

                    </div>

                </div>

                <div className='content'>
                    <div className='header'>
                        <img
                            src={hideIcon}
                            className="header-action-icon"
                            onClick={() => setCollapsed(!collapsed)}
                        />

                        <div className='d-flex align-items-center px-4'>
                            <Badge count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                                <img src={notify} className="header-action-icon px-3 "></img>
                            </Badge>

                            <strong> <Link className='anchor text-warning font-weight-bold mx-3' to="/profile">{user?.name}</Link></strong>


                        </div>
                    </div>
                    <div className='body'>
                        {children}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Layout