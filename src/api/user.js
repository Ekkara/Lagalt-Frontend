import keycloak from '../keycloak';
import { createHeaders } from "./apiIndex";
import axios from "./index";


// export const getUserInfo = async () => {
//   try {
//     // Refresh token if it is expired or will expire soon
//     if (keycloak.token && keycloak.isTokenExpired()) {
//       await keycloak.updateToken();
//     }

//     const response = await fetch("https://localhost:7132/api/v1/Users", {
//       method: 'GET',
//       headers: createHeaders()
//     });


//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     if (!data || typeof data !== 'object') {
//       throw new Error('Response data is empty or not in the expected format');
//     }

//     return data;
//   } catch (error) {
//     console.error(error);
//   }
// };

export const getUserInfo = async () => {
  try {
    const response = await axios.get("https://localhost:7132/api/v1/Users");

    const data = response.data;
    if (!data || typeof data !== 'object') {
      throw new Error('Response data is empty or not in the expected format');
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

async function getUserById(userId) {
  try {
    const response = await axios.get(`https://localhost:7132/api/v1/Users/${userId}`);
    const user = response.data;
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${userId}:`, error);
  }
}


// async function getUserById(userId, accessToken) {
//   const response = await fetch(`https://localhost:7132/api/v1/Users/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${accessToken}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (response.ok) {
//     const user = await response.json();
//     return user;
//   } else {
//     throw new Error(`Error fetching user with ID ${userId}: ${response.statusText}`);
//   }
// }

