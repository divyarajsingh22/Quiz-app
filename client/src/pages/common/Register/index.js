import { Form, message } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import "./index.css";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await registerUser(values);

      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="register-container">
      <div className="register-overlay"></div>
      <div className="register-card">
        <div className="register-header">
          <h1>QUIZ REGISTER <i className="ri-user-add-line"></i></h1>
          <p className="university-tagline">Expand Your Knowledge</p>
        </div>
        
        <div className="register-divider"></div>
        
        <Form layout="vertical" className="register-form" onFinish={onFinish}>
          <Form.Item 
            name="name" 
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <input type="text" placeholder="Enter your name" />
          </Form.Item>
          
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
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <input type="password" placeholder="Create a secure password" />
          </Form.Item>

          <div className="register-actions">
            <button type="submit" className="register-button">
              Register Now
            </button>
            
            <Link to="/login" className="login-link">
              Already a member? Login here
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;