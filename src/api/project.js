import axios from "axios";
import { currentUserId } from "../keycloak";
import { BASE_URL } from "./application";
import keycloak from "../keycloak";

export const createProject = async (data) => {
    // Refresh token if it is expired or will expire soon
    if (keycloak.token && keycloak.isTokenExpired()) {
      await keycloak.updateToken();
    }

  await axios.post(BASE_URL + `Projects`, data).catch((error) => {
    console.error("Error while adding:", error);
  });
};

export const editProject = async (projectId, data) => {
// Refresh token if it is expired or will expire soon
if (keycloak.token && keycloak.isTokenExpired()) {
  await keycloak.updateToken();
}

  await axios.put(BASE_URL + "Projects/" + projectId, data).catch((error) => {
    console.error("Error updating project:", error);
  });
};

export const deleteProject = async (projectId) => {
  // Refresh token if it is expired or will expire soon
  if (keycloak.token && keycloak.isTokenExpired()) {
    await keycloak.updateToken();
  }

  axios.delete(BASE_URL + "Projects/" + projectId);
};

export const getProjectRole = async(projectId) => {
  // Refresh token if it is expired or will expire soon
  if (keycloak.token && keycloak.isTokenExpired()) {
    await keycloak.updateToken();
  }

  return await axios
    .get(
      `${BASE_URL}Projects/UsersRelationToProject?projectId=${projectId}&userId=${currentUserId}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const projectExist = async(projectId) => {
// Refresh token if it is expired or will expire soon
if (keycloak.token && keycloak.isTokenExpired()) {
  await keycloak.updateToken();
}

  return await axios
    .get(BASE_URL + `Projects/${projectId}/ProjectExist`)
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getNonSecretProjectView = async(projectId) => {
// Refresh token if it is expired or will expire soon
if (keycloak.token && keycloak.isTokenExpired()) {
  await keycloak.updateToken();
}


  return await axios
    .get(BASE_URL + `Projects/${projectId}/NonCollaboratorProjectView`)
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
      BASE_URL +
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
      BASE_URL +
        `Projects/${projectId}/AdminProjectView?userId=${currentUserId}`
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
        BASE_URL +
          `Projects/${projectId}/RemoveMemberFromProject?userId=${userId}`
      )
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.error(error);
  }
};

export const sendApplication = async(projectId, data) =>{
  axios
      .put(
        `https://localhost:7132/api/Projects/${projectId}/AddProjectApplication`, data
      )
      .catch((error) => {
        console.error("Error updating project:", error);
      });
}
export const acceptApplication = async (applicationId) => {
  axios
    .put(BASE_URL + `Projects/${applicationId}/AcceptProjectApplication`, {})
    .catch((error) => {
      console.error("Error updating project:", error);
    });
};
export const declineApplication = async (applicationId) => {
  axios
    .put(
      BASE_URL +
        `Projects/${applicationId}/RemoveProjectApplicationFromProject`,
      {}
    )
    .catch((error) => {
      console.error("Error updating project:", error);
    });
};

export const loadMainPageProjects = async (from, to, searchFilter) => {
  const result = await axios.get(BASE_URL + `Projects/ProjectsForMainPage`, {
    params: {
      start: from,
      range: to - from,
      searchFilterJson: JSON.stringify(searchFilter)
    }
  }).catch((error) => {
    console.log(error);
  });
  return result;
};
