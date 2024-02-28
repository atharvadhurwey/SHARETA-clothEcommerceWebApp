import React, { useContext } from 'react';
import './DashboardOrders.css';
import { ShopContext } from '../../Context/ShopContext';

const DashboardOrders = () => {
  const { purchaseHistory } = useContext(ShopContext);

  // console.log(purchaseHistory[0]);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const getDate = (date) => {
    // console.log(date);
    var d = new Date(date);
    // console.log('date', d.getUTCDate());
    // console.log('month', d.getUTCMonth() + 1); // Months are zero based
    // console.log('year', d.getUTCFullYear());
    // console.log('hours', d.getUTCHours()); // Hours
    // console.log('min', d.getUTCMinutes());
    // console.log('sec', d.getUTCSeconds());

    return `${d.getUTCDate()} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
  };

  const getItemLength = (itemsList) => {
    // console.log(itemsList);
    return itemsList;
  };

  return (
    <div className="dashboard-orders-container">
      <div className="dashboard-orders-wrapper">
        <div className="dashboard-orders-items">
          {purchaseHistory.length > 0 ? (
            purchaseHistory.map((item, i) => {
              return (
                <div className="dashboard-orders-item" key={i}>
                  <div className="dashboard-orders-item-id">Order ID: {item.id}</div>
                  <div className="dashboard-orders-item-date">Order Date: {getDate(item.create_time)}</div>
                  <div className="dashboard-orders-item-status">Order Status: {item.status}</div>
                  <div className="dashboard-orders-item-amount">Total Amount: {item.purchase_units[0].amount.value}</div>
                  <div className="dashboard-orders-item-numberOfItems">No. of Items: {getItemLength(item.purchase_units[0].items.length)}</div>
                </div>
              );
            })
          ) : (
            <div className="dashboard-orders-item">No Orders Found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardOrders;
