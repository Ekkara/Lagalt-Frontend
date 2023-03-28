import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Template from "./templates/Template";
import axios from "axios";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import { Row, Col } from "react-bootstrap";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
  const [data, setData] = useState();
  const [projectRole, setProjectRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await projectExist(projectId);
        setData(data);
        if (data && keycloak.authenticated) {
          const newProjectRole = await getProjectRole(projectId);
          setProjectRole(newProjectRole);
          console.log(newProjectRole);
        } else {
          setProjectRole(0);
        }
      } catch (e) {
        console.log(e);
        setData(null);
      }
    };
    fetchData();
  }, [projectId]);

  const getProjectWindow = () => {
    if (!data) {
      return <ProjectNotFound />;
    } else {
      if (keycloak.authenticated) {
        switch (projectRole) {
          case 2:
            console.log("fetching member view");
            return <ProjectCollaborator projectId={projectId} />;

          case 3:
            console.log("fetching admin view");
            return <ProjectAdmin projectId={projectId} />;

          default:
            console.log("fetching logged in view");
            return <ProjectLoggedIn projectId={projectId} />; //not a member in the project (case 1)
        }
      } else {
        console.log("fetching not logged in view");
        return <ProjectNotLoggedIn projectId={projectId} />; //not logged in
      }
    }
  };

  return <Template mainContent={projectRole !== null && getProjectWindow()} />;
};
export default Project;
