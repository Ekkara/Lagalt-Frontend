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

const Project = () => {
  const { projectId } = useParams();
  const [data, setData] = useState();
  //0 - not logged in
  //1 - user not member
  //2 - member
  //3 - admin

  const loggedInStatus = 1;

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
      switch (loggedInStatus) {
        case 1:
          return <ProjectLoggedIn projectId={projectId} />;
        
          case 2:
          return <ProjectCollaborator projectId={projectId} />;

        case 3:
          return <ProjectAdmin projectId={projectId} />;

        default:
          return <ProjectNotLoggedIn projectId={projectId} />;
      }
    }
  };

  return <Template>{getProjectWindow()}</Template>;
};
export default Project;
