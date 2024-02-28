import React, { useContext } from 'react';
import './DashboardMain.css';
import { ShopContext } from '../../Context/ShopContext';

const DashboardMain = () => {
  const { userDetails } = useContext(ShopContext);

  function importAllImg(r) {
    let images = {};
    r.keys().map((item, index) => {
      return (images[item.replace('./', '')] = r(item));
    });
    return images;
  }
  const images = importAllImg(require.context('../Assets/profilePicture', false, /\.(png|jpe?g|svg)$/));

  function hexToInt(hexString) {
    return parseInt(hexString, 16);
  }

  return (
    userDetails.id && (
      <div className="dashboardMain-container">
        <div className="dashboardMain-wrapper">
          <div className="dashboardMain-profilePic">
            <img src={images[`avatar${hexToInt(userDetails.id) % 6}.jpg`]} alt="profile" />
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
    )
  );
};

export default DashboardMain;
