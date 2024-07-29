import React, { useState } from 'react';
import authService from '../services/authService';

// const Login = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     authService.login(username, password).then(user => {
//       onLogin(user);
//     });
//   };
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); // Clear any previous errors
  //   try {
  //     const user = await authService.login(username, password);
  //     onLogin(user);
  //   } catch (error) {
  //     if (error.response && error.response.data) {
  //       console.error('Error response:', error.response.data); // Log the error response
  //       setError(error.response.data.detail || 'An unexpected error occurred. Please try again.');
  //     } else {
  //       setError('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // };
  //onther one 


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); // Clear any previous errors
  
  //   try {
  //     // Use authService.login instead of authService.register
  //     const response = await authService.login(username, password);
      
  //     console.log('Login successful:', response);
  
  //     // Assuming onLogin is a prop function to handle post-login actions
  //     onLogin(response);
  //   } catch (error) {
  //     console.error('Login failed:', error); // Log the full error
  
  //     // Customize error handling based on the structure of your error response
  //     if (error.response && error.response.data) {
  //       setError(error.response.data.detail || 'Login failed. Please check your username and password.');
  //     } else {
  //       setError('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(''); // Clear any previous errors
  
  //   try {
  //     // Use authService.login to log in the user
  //     const response = await authService.login(username, password);
  
  //     console.log('Login successful:', response);
  
  //     // Call the parent component's onLogin handler, if necessary
  //     onLogin(response);
  //   } catch (error) {
  //     console.error('Login failed:', error); // Log the full error
  
  //     // Customize error handling based on the structure of your error response
  //     if (error.response && error.response.data) {
  //       setError(error.response.data.detail || 'Login failed. Please check your username and password.');
  //     } else {
  //       setError('An unexpected error occurred. Please try again.');
  //     }
  //   }
  // };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const user = await authService.login(username, password);
      onLogin(user);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error response:', error.response.data); // Log the error response
        setError(error.response.data.detail || 'An unexpected error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  return (
    <form onSubmit={handleSubmit} className="container mt-5">
  <h2 className="text-center mb-4">Login</h2>
  {error && <p className="text-danger text-center">{error}</p>}
  <div className="form-group">
    <label htmlFor="username">Username</label>
    <input
      type="text"
      id="username"
      name="username"
      className="form-control"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      name="password"
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button type="submit" className="btn btn-warning btn-block">Login</button>
</form>
  );
};

export default Login;