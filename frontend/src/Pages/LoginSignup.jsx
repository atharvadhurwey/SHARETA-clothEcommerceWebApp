import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import login_img from '../Components/Assets/cloths/loginSideBanner.jpg';
import signup_img from '../Components/Assets/cloths/signupSideBanner.jpg';
import Breadcrum from '../Components/Breadcrums/Breadcrum';

const BASE_URL = process.env.REACT_APP_PROTOCOL + process.env.REACT_APP_HOST_URL;

const LoginSignup = () => {
  const [state, setState] = useState('Login');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    console.log('login', formData);
    let responseData;

    await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.message);
    }
  };

  const singup = async () => {
    console.log('signup', formData);
    let responseData;

    await fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      window.location.replace('/');
    } else {
      alert(responseData.message);
    }
  };

  return (
    <>
      <Breadcrum crum={'HOME / USER '} name={state} banner={'login'} />

      <section className="login-signup-wrapper">
        <div className="login-signup-sideBanner-container">
          {state === 'Sign Up' ? <img src={signup_img} className="login-signup-sideBanner-img" alt="" /> : <img src={login_img} className="login-signup-sideBanner-img" alt="" />}
        </div>
        <div className="login-signup-sideContent-container">
          <div className="login-signup-sideContent-heading">{state}</div>
          {state === 'Sign Up' ? <input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" /> : <></>}
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Email Address" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
          <div className="login-signup-sideContent-agree">
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          <button
            className="login-signup-sideContent-button"
            onClick={() => {
              state === 'Login' ? login() : singup();
            }}
          >
            {state === 'Sign Up' ? 'Sign Up' : 'Login'}
          </button>
          {state === 'Sign Up' ? (
            <p className="login-signup-sideContent-state">
              Already have an account?{' '}
              <span
                onClick={() => {
                  setState('Login');
                }}
              >
                Login Here
              </span>
            </p>
          ) : (
            <p className="login-signup-sideContent-state">
              Create an account?{' '}
              <span
                onClick={() => {
                  setState('Sign Up');
                }}
              >
                Sign Up Here
              </span>
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default LoginSignup;
