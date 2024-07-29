import React, { useState } from 'react';
import authService from '../services/authService';

const Register = ({ onRegister }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      await authService.register(username, email, password);
      onRegister(username, email, password);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error('Error response:', error.response.data); // Log the error response
        setError(error.response.data.error || 'An unexpected error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };*/
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    try {
      const response = await authService.register(username, email, password);
      console.log('Registration successful:', response);
      onRegister(username, email, password);
    } catch (error) {
      console.error('Registration failed:', error); // Log the full error
      if (error.error) {
        setError(error.error);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
  <h2 className="text-center mb-4">Register</h2>
  {error && <p className="text-danger text-center">{error}</p>}
  <div className="form-group">
    <label htmlFor="username">Username</label>
    <input
      type="text"
      id="username"
      className="form-control"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="email">Email</label>
    <input
      type="email"
      id="email"
      className="form-control"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <div className="form-group">
    <label htmlFor="password">Password</label>
    <input
      type="password"
      id="password"
      className="form-control"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
  </div>
  <button type="submit" className="btn btn-primary btn-block">Register</button>
</form>
  );
};

export default Register;