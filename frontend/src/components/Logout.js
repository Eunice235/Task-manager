import React from 'react';

import authService from '../services/authService';

const Logout = ({ onLogout }) => {
  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger btn-block mt-3">Logout</button>
  );
};

export default Logout;