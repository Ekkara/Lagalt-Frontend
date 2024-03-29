import keycloak from "../keycloak";
import { createHeaders } from "./apiIndex";
import axios from "axios";
import { currentUserId } from "../keycloak";
import { BASE_URL } from "./application";



export const getUserById = async (userId) => {
  try {
    // Check if the userId and viewerId are valid
    if (userId === -1 || currentUserId === -1) {
      console.error("Invalid userId or viewerId:", userId, currentUserId);
      return {
        error: "Invalid userId or viewerId",
      };
    }
    // Refresh token if it is expired or will expire soon
    if (keycloak.token && keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }

    let config = {
      headers: {
        Authorization: "Bearer " + keycloak.token,
      },
    }

    return axios
      .get(BASE_URL + `v1/Users/${userId}?viewerId=${currentUserId}`, config)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};
export const getUserByIdNotLoggedIn = async (userId) => {
  try {
    // Check if the userId and viewerId are valid
    if (userId === -1) {
      console.error("Invalid userId:", userId);
      return {
        error: "Invalid userId",
      };
    }
    return await axios
    .get(BASE_URL + `v1/Users/${userId}/getUserByIdNotLoggedIn`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (newData) => {
  try {
      // Refresh token if it is expired or will expire soon
      if (keycloak.token && keycloak.isTokenExpired()) {
        await keycloak.updateToken();
      }

      const config = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Remove the function call here
        },
      };

    return axios
    .put(BASE_URL + `v1/Users/${currentUserId}/UpdateUser`, newData, config)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const addSkillToUser = async (skill) => {
  try {
    // Refresh token if it is expired or will expire soon
    if (keycloak.token && keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }
    const config = {
      method: "PUT",
      headers: createHeaders(),
    };

    return await axios
    .put(BASE_URL + `v1/Users/${currentUserId}/AddSkill?skill=${skill}`, config)
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};
export const removeSkillFromUser = async (skill) => {
  try {
    // Refresh token if it is expired or will expire soon
    if (keycloak.token && keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }

    const config = {
      method: "DELETE",
      headers: createHeaders(),
    };

    return await axios
    .put(BASE_URL + `v1/Users/${currentUserId}/RemoveSkill?skill=${skill}`, null, config)
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
  }
};
