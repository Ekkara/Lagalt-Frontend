import axios from "axios";
import { idToken as currentUserId } from "../keycloak";
import { baseUrl } from "./application";

export const createProject = async (data) => {
  await axios.post(baseUrl + `Projects`, data).catch((error) => {
    console.error("Error while adding:", error);
  });
};

export const getProjectRole = (projectId) => {
  return axios
    .get(
      `${baseUrl}Projects/UsersRelationToProject?projectId=${projectId}&userId=${currentUserId}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const projectExist = (projectId) => {
  return axios
    .get(baseUrl + `Projects/${projectId}/ProjectExist`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNonSecretProjectView = (projectId) => {
  return axios
    .get(baseUrl + `Projects/${projectId}/NonCollaboratorProjectView`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getCollaboratorView = (projectId) => {
  return axios
    .get(
      baseUrl +
        `Projects/${projectId}/CollaboratorProjectView?userId=${currentUserId}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getAdminView = (projectId) => {
  return axios
    .get(
      baseUrl + `Projects/${projectId}/AdminProjectView?userId=${currentUserId}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const removeUserFromProject = async (userId, projectId) => {
  try {
    await axios
      .put(
        baseUrl +
          `Projects/${projectId}/RemoveMemberFromProject?userId=${userId}`
      )
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};
