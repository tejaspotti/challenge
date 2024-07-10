import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastNotificationContainer = () => {
  return <ToastContainer position="top-right" autoClose={3000} hideProgressBar />;
};

export default ToastNotificationContainer;
