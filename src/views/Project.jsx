import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Template from "./templates/Template";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";

import ProjectNotFound from "./templates/ProjectNotFound";
import ProjectNotLoggedIn from "./templates/ProjectNotLoggedIn";
import ProjectLoggedIn from "./templates/ProjectLoggedIn";
import ProjectCollaborator from "./templates/ProjectCollaborator";
import ProjectAdmin from "./templates/ProjectAdmin";
import keycloak from "../keycloak";
import { getProjectRole } from "../api/project";
import { projectExist } from "../api/project";

const Project = () => {
  const { projectId } = useParams();
  const [projectRole, setProjectRole] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //see if project exist
        const projectFound = await projectExist(projectId);        

        //if it exist we look which role a user has, if we are not logged in at front end we know
        //the user is not logged in so that role is set manually without needing to communicating
        //with the server. The number and their representation can be seen below:
        // 0 - not logged in
        // 1 - logged in, but not a collaborator
        // 2 - logged in and is a collaborator
        // 3 - logged in and is a admin/owner
        if (projectFound) {
          if (keycloak.authenticated) {
            const newProjectRole = await getProjectRole(projectId);
            setProjectRole(newProjectRole);
          }
          else{
            setProjectRole(0);
          }
        } 
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [projectId]);

  const getProjectWindow = () => {
    //if no project was found we display the no project found page as a default (when projectRole still is -1 from it was initiated)
    switch (projectRole) {
      case 0:
        return <ProjectNotLoggedIn projectId={projectId} />; 

      case 1:
        return <ProjectLoggedIn projectId={projectId} />; 

      case 2:
        return <ProjectCollaborator projectId={projectId} />;

      case 3:
        return <ProjectAdmin projectId={projectId} />;

      default:
        return <ProjectNotFound />;
    }
  };
  return <Template mainContent={projectRole !== null && getProjectWindow()} />;
};
export default Project;
