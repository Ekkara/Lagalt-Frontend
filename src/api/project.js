import axios from "axios";
import { idToken } from "../keycloak";

export const getProjectRole = (projectId) => {
  return axios
    .get(
      `https://localhost:7132/api/Projects/UsersRelationToProject?projectId=${projectId}&userId=${idToken}`
    )
    .then((result) => {
      return result.data;
    })
    .catch((error) => {
      console.log(error);
    });
};
