import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();  // Use useNavigate hook for navigation
  
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        navigate("/");  // Navigate to the home page (or /home)
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-card">
        <div className="login-header">
          <h1>QUIZ LOGIN <i className="ri-login-circle-line"></i></h1>
          <p className="university-tagline">Welcome Back, Scholar</p>
        </div>
        
        <div className="login-divider"></div>
        
        <Form layout="vertical" className="login-form" onFinish={onFinish}>
          <Form.Item 
            name="email" 
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <input type="email" placeholder="Enter your email address" />
          </Form.Item>
          
          <Form.Item 
            name="password" 
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <input type="password" placeholder="Enter your password" />
          </Form.Item>

          <div className="login-actions">
            <button type="submit" className="login-button">
              Sign In
            </button>
            
            <Link to="/register" className="register-link">
              Not a member? Register now
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
