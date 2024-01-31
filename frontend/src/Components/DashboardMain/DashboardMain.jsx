import React, { useContext } from 'react';
import './DashboardMain.css';
import { ShopContext } from '../../Context/ShopContext';

const DashboardMain = () => {
  const { userDetails } = useContext(ShopContext);

  return (
    <div className="dashboardMain-container">
      <div className="dashboardMain-heading">My Profile</div>
      <div className="dashboardMain-wrapper">
        <div className="dashboardMain-profilePic">
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="profile" />
        </div>
        <div className="dashboardMain-profileContent">
          <div className="dashboardMain-item">
            <div className="dashboardMain-item-heading">Name</div>
            <div className="dashboardMain-item-content">{userDetails.name}</div>
          </div>
          <div className="dashboardMain-item">
            <div className="dashboardMain-item-heading">Email</div>
            <div className="dashboardMain-item-content">{userDetails.email}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
