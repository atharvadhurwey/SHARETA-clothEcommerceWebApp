import React from 'react';
import './CSS/Dashboard.css';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const Dashboard = () => {
  return (
    <>
      <Breadcrum crum={'HOME / USER '} name={'dashboard'} banner={'dashboard'} />
    </>
  );
};

export default Dashboard;
