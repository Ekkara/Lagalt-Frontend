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
import React, { useCallback } from 'react';

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

  const loggedInStatus = 3;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ProjectUtils.getData(
          `https://localhost:7132/api/Projects/${projectId}/ProjectExist`
          // `https://localhost:7132/api/Projects/${projectId}/AdminProjectView`
        );
        setData(data);
      } catch {
        setData(null);
      }
    };
    fetchData();
  }, [projectId]);

  const getProjectWindow = () => {
    console.log(data);
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

<<<<<<< HEAD
  const getData = useCallback(async () => {
    await axios
      //.get("https://localhost:7132/api/Projects/" + projectId)
      .get(`https://localhost:7132/api/Projects/${projectId}/AdminProjectView`)
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [projectId]);

useEffect(() => {
    getData();
}, [projectId, getData]);

  return (
    <Template>
      {data && (
        <div id="Content">
          {showEditForm && (
            <div>
              <div className="dark" onClick={hideEditForm}></div>
              <div className="aboveDark bg-container">
                <form onSubmit={handleSubmit(editProject)}>
                  <h4>Project's name:</h4>
                  <input
                    className="mb-4"
                    defaultValue={data.projectName}
                    {...register("projectName", {
                      required: true,
                      minLength: 5,
                      maxLength: 50,
                    })}
                  />

                  <h4>Project's description:</h4>
                  <textarea
                    className="mb-4"
                    defaultValue={data.projectDescription}
                    {...register("projectDescription")}
                  />

                  <h4>Project type</h4>
                  <select
                    className="mb-4 w-100"
                    id="Project type"
                    defaultValue={data.projectCategoryName}
                    {...register("projectCategoryName")}
                  >
                    <option value="Game">Game</option>
                    <option value="Music">Music</option>
                  </select>
                  <h4>Is available</h4>
                  <input
                    type="checkbox"
                    //value="true"
                    defaultValue={data.isAvailable}
                    {...register("projectAvailability")}
                  />
                  <Row>
                    <Col>
                      <button className="w-100" type="submit">
                        Confirm
                      </button>
                    </Col>
                    <Col>
                      <button className="w-100" onClick={hideEditForm}>
                        Cancel
                      </button>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          )}
          <div id="PrimaryContent">
            <div className="py-0 my-0 px-2">
              <h1>{data.projectName}</h1>
              <p>{data.description}</p>
              <Link to="/Main">Go back to the main page</Link>
            </div>
          </div>
          <div className="bg-frame m-3">
            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button" onClick={displayEditForm}>
                  Edit Project
                </button>
                <button className="Button mb-4" onClick={deleteProject}>
                  Delete Project
                </button>
              </div>
            </div>

            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button">Group Chat</button>
                <button className="Button">Skills required</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Template>
  );
=======
  return <Template>{getProjectWindow()}</Template>;
>>>>>>> 498d7c1c08d4ee2b9a654b67b9d68c750ea37160
};
export default Project;
