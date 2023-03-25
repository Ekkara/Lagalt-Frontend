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
import ProjectUtils from "../components/Utils/ProjectUtils";
import keycloak from "../keycloak";
import { getProjectRole } from "../api/project";

const Project = () => {
  const { projectId } = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProjectUtils.getData(
          `https://localhost:7132/api/Projects/${projectId}/ProjectExist`
        );
        setData(data);
      } catch {
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
        const loggedInStatus = getProjectRole(projectId).finally(() => {
          console.log(loggedInStatus);
        });
        switch (loggedInStatus) {
          case 2:
            return <ProjectCollaborator projectId={projectId} />;

          case 3:
            return <ProjectAdmin projectId={projectId} />;

          default:
            return <ProjectLoggedIn projectId={projectId} />; //not a member in the project (case 1)
        }
      } else {
        return <ProjectNotLoggedIn projectId={projectId} />; //not logged in
      }
    }
  };

  return (<Template>{getProjectWindow()}</Template>);
};
export default Project;
