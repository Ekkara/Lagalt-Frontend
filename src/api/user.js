import keycloak from "../keycloak";
import { createHeaders } from "./apiIndex";
import axios from "axios";
import { idToken } from "../keycloak";
import { baseUrl } from "./application";

export const getUserById = async (userId) => {
  try {
    // Refresh token if it is expired or will expire soon
    // if (keycloak.token && keycloak.isTokenExpired()) {
    //   await keycloak.updateToken();
    // }

    return axios
      .get(baseUrl + `v1/Users/${userId}?viewerId=${idToken}`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (newData) => {
  try {
    // Refresh token if it is expired or will expire soon
    // if (keycloak.token && keycloak.isTokenExpired()) {
    //   await keycloak.updateToken();
    // }

    return axios
    .put(baseUrl + `v1/Users/${idToken}/UpdateUser`, newData)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const addSkillToUser = async (skill) => {
  try {
    // Refresh token if it is expired or will expire soon
    // if (keycloak.token && keycloak.isTokenExpired()) {
    //   await keycloak.updateToken();
    // }

    return await axios
    .put(baseUrl + `v1/Users/${idToken}/AddSkill?skill=${skill}`)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};
export const removeSkillFromUser = async (skill) => {
  try {
    // Refresh token if it is expired or will expire soon
    // if (keycloak.token && keycloak.isTokenExpired()) {
    //   await keycloak.updateToken();
    // }

    return await axios
    .put(baseUrl + `v1/Users/${idToken}/RemoveSkill?skill=${skill}`)
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

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
