import React from 'react';
import { Link } from 'react-router-dom';

const AccountMenu = () => {
  return (
    <>
      <div className="header-accountBtn-toggle" id="accountBtn-toggle">
        <div className="accountbox-main-container">
          {localStorage.getItem('auth-token') ? (
            <div>
              <div
                className="link"
                onClick={() => {
                  localStorage.removeItem('auth-token');
                  window.location.replace('/');
                }}
              >
                Logout
              </div>
            </div>
          ) : (
            <div>
              <Link className="link" to="/login">
                Login/Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccountMenu;
