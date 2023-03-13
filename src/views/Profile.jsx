import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Template from "./templates/Template";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";

const Profile = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);

  const [data, setData] = useState({
    profileName: "",
    profileImgSrc: "",
  });

  const displayCreateForm = () => {
    if (showCreateForm) setShowCreateForm(false);
    else setShowCreateForm(true);
  };
  const hideCreateForm = () => {
    setShowCreateForm(false);
  };

  const { register, handleSubmit } = useForm();

  const createProject = (formData) => {
    setShowCreateForm(false);

    const data = {
      projectName: formData.projectName,
      projectDescription: formData.projectDescription,
      projectCategoryId: 1,
      projectCategoryName: formData.projectCategoryName,
      projectIsAvailable: formData.projectAvailability,
    };

    axios.post("https://localhost:7132/api/Projects", data).catch((error) => {
      console.error("Error while adding:", error);
    });
  };

  useEffect(() => {
    //TODO: add security so not any one can view profile
  });

  return (
    <Template>
      <div id="Content">
        {/* if creating a project  */}
        {showCreateForm && (
          <div>
            <div className="dark" onClick={hideCreateForm}></div>
            <div className="aboveDark bg-container">
              <form onSubmit={handleSubmit(createProject)}>
                <h4>Project's name:</h4>
                <input
                  className="mb-4"
                  placeholder="Insert name..."
                  {...register("projectName", {
                    required: true,
                    minLength: 5,
                    maxLength: 50,
                  })}
                />

                <h4>Project's description:</h4>
                <textarea
                  className="mb-4"
                  placeholder="Insert description..."
                  {...register("projectDescription")}
                />

                <h4>Project type</h4>
                <select
                  className="mb-4 w-100"
                  id="Project type"
                  {...register("projectCategoryName")}
                >
                  <option value="Game">Game</option>
                  <option value="Music">Music</option>
                </select>
                <Row>
                  <Col>
                    <button className="w-100" type="submit">Create</button>
                  </Col>
                  <Col>
                    <button className="w-100" onClick={hideCreateForm}>Cancel</button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        )}

        <div id="PrimaryContent">          
            <div>
              <h3>User's Profile</h3>
              <div className="w-80 mx-auto">
                <img
                  src={data.profileImgSrc}
                  className="w-100"
                  alt="Profile picture"
                />
              </div>
              <h3>Project history</h3>
              <div id="ProjectHistory" className="bg-container">
                hello world
              </div>
            </div>
        </div>
        <div className="bg-secondary" id="SecondaryContent">
          <button className="Button" onClick={displayCreateForm}>
            Create Project
          </button>
        </div>
      </div>
    </Template>
  );
};
export default Profile;
