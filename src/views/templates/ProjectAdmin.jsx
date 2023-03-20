import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { Row, Col } from "react-bootstrap";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ProjectUtils from "../../components/Utils/ProjectUtils";

const ProjectAdmin = (props) => {
    const navigate = useNavigate();
    const {projectId} = props;

    const [data, setData] = useState({
        projectName: "",
        projectDescription: "",
      });
      const [showEditForm, setShowEditForm] = useState(false);
    
      const displayEditForm = () => {
        if (showEditForm) setShowEditForm(false);
        else setShowEditForm(true);
      };
      const hideEditForm = () => {
        setShowEditForm(false);
      };

      const { register, handleSubmit } = useForm();
      
      const editProject = async (formData) => {
        setShowEditForm(false);
        axios
          .put("https://localhost:7132/api/Projects/" + projectId, {
            projectName: formData.projectName,
            description: formData.projectDescription,
            categoryName: formData.projectCategoryName,
            isAvailable: formData.projectAvailability === "true",
          })
          .then(() => {
            setData(ProjectUtils.getData(`https://localhost:7132/api/Projects/${projectId}/AdminProjectView`))
          })
          .catch((error) => {
            console.error("Error updating element:", error);
          });
      };

      const deleteProject = () => {
        if (
          window.confirm(
            "Are you sure you wish to delete this project? This can't be undone!"
          )
        ) {
          axios.delete("https://localhost:7132/api/Projects/" + projectId);
          navigate("/main");
        }
      };
     
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

  return (
    <div>
        admin
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
    </div>
  );
};
export default ProjectAdmin;
