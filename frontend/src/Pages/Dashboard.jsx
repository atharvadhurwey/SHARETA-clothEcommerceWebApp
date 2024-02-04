import React, { useState } from 'react';
import './CSS/Dashboard.css';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import { Link } from 'react-router-dom';
import DashboardOrders from '../Components/DashboardOrders/DashboardOrders';
import DashboardMain from '../Components/DashboardMain/DashboardMain';

const Dashboard = () => {
  const [userSelect, setUserSelect] = useState('profile');

  const getComponent = () => {
    if (userSelect === 'profile') {
      return <DashboardMain />;
    } else if (userSelect === 'orders') {
      return <DashboardOrders />;
    }
  };

  return (
    <>
      <Breadcrum crum={'HOME / USER '} name={'dashboard'} banner={'dashboard'} />
      <section className="dashboard-main-container">
        <div className="dashboard-main-heading">My dashboard</div>
        <div className="dashboard-main-content">
          <div className="dashboard-left">
            <div className="dashboard-left-items-container">
              <div className="dashboard-item">
                <Link
                  onClick={() => {
                    setUserSelect('profile');
                  }}
                >
                  Profile
                </Link>
              </div>
              <div className="dashboard-item">
                <Link
                  onClick={() => {
                    setUserSelect('orders');
                  }}
                >
                  Orders
                </Link>
              </div>
              <div className="dashboard-item">
                <Link
                  onClick={() => {
                    localStorage.removeItem('auth-token');
                  }}
                  to={'/'}
                >
                  Logout
                </Link>
              </div>
            </div>
          </div>
          <div className="dashboard-right">
            <div className="dashboard-right-items-container">{getComponent()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
