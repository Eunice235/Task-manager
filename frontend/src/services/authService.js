import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';

/*const register = (username, email, password) => {
  return axios.post(API_URL + 'register/', {
    username,
    email,
    password
  });
};*/
const register = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}register/`, {
      username,
      email,
      password,
    });
    console.log('Server response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error('Server responded with an error:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      // Request was made but no response received
      console.error('No response received:', error.request);
      throw new Error('No response received from server.');
    } else {
      // Something else caused the error
      console.error('Error setting up request:', error.message);
      throw new Error('Error setting up request.');
    }
  }
};


/*const login = (username, password) => {
  return axios.post(API_URL + 'token/', {
    username,
    password
  }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};*/
// const login = async (username, password) => {
//   try {
//     // Ensure username and password are strings
//     const response = await axios.post(API_URL + 'token/', {
//       username: String(username),
//       password: String(password)
//     }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     if (response.data.access) { // Ensure the key is 'access', not 'accessToken'
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       console.error('Login error details:', error.response.data);
//     } else {
//       console.error('Login error:', error.message);
//     }
//     throw error;
//   }
// };
// const login = async (username, password) => {
//   try {
//     console.log('Logging in with:', { username, password });
//     const response = await axios.post(API_URL + 'token/', {
//       username: String(username),
//       password: String(password)
//     }, {
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });

//     console.log('Server response:', response.data);

//     if (response.data.access) { // Ensure the key is 'access'
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.data) {
//       console.error('Login error details:', error.response.data);
//     } else {
//       console.error('Login error:', error.message);
//     }
//     throw error;
//   }
// };

//onther comment 

// const login = async (username, password) => {
//   try {
//     const response = await axios.post(`${API_URL}token/`, {
//       username,
//       password
//     });
//     console.log('Server response:', response.data);
//     return response.data;
//   } catch (error) {
//     if (error.response && error.response.status === 401) {
//       console.error('Unauthorized: Invalid username or password');
//     } else {
//       console.error('Login error details:', error.response ? error.response.data : error.message);
//     }
//     throw error;
//   }
// };
const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}token/`, {
      username,
      password
    });
    console.log('Server response:', response.data);

    // Store the user information in localStorage
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized: Invalid username or password');
    } else {
      console.error('Login error details:', error.response ? error.response.data : error.message);
    }
    throw error;
  }
};



const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser
};

export default authService;