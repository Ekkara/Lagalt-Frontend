import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Template from "./templates/Template";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import { keycloak } from "../keycloak";


const Profile = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { userId } = useParams();
  const [data, setData] = useState({
    profileId: 1,
    profileName: "",
    profileImgSrc: "",
    userId: "",
    userName: "",
  });

  const { authenticated, token } = keycloak;

  useEffect(() => {
    if (authenticated && userId) {
      // Fetch the user profile data from the API and update the state
      const fetchProfileData = async () => {
        try {
          const response = await axios.get(`https://localhost:7132/api/Profile/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData({
            ...response.data,
            userId: userId,
            userName: keycloak.tokenParsed.name,
          });
        } catch (error) {
          console.error("Error while fetching profile data:", error);
        }
      };
  
      fetchProfileData();
    } else {
      // Redirect the user to the login page or show a message
    }
  }, [authenticated, userId, token]);
  
  
  
  

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
      ownerId: keycloak.subject,
      projectName: formData.projectName,
      description: formData.projectDescription,
      categoryName: formData.projectCategoryName,
      isAvailable: true
    };
  
    axios.post("https://localhost:7132/api/Projects", data, {
      headers: {
        Authorization: `Bearer ${keycloak.token}`,
      },
    }).catch((error) => {
      console.error("Error while adding:", error);
    });
  };
  

  return (
  <Template>
    <div id="Content">
      {showCreateForm && (
        <div>
          <div className="dark" onClick={hideCreateForm}></div>
          <div className="aboveDark bg-container">
            <form onSubmit={handleSubmit(createProject)}>
              {/* ... */}
            </form>
          </div>
        </div>
      )}
      <div id="PrimaryContent" className="mx-3">
        <div>
          <h3>User's Profile</h3>
          <p>User ID: {data.userId}</p> {/* Display the User ID */}
          <p>User Name: {data.userName}</p> {/* Display the User Name */}
          <p>Keycloak Token:</p>
          <pre>{keycloak.token}</pre> {/* Display the Keycloak token */}
          <div className="w-80 mx-auto">
            <img src={data.profileImgSrc} className="w-100" alt="Profile picture" />
          </div>
          <h3>Project history</h3>
          <div id="ProjectHistory" className="bg-container w-100">
            hello world
          </div>
        </div>
      </div>
      {/* right side */}
      <div className="bg-frame m-3">
        <div className="bg-content m-3 p-2" id="SecondaryContent">
          <div className="w-100">
            <button className="Button" onClick={displayCreateForm}>
              Create Project
            </button>
            <button className="Button">
              Edit Project
            </button>
            <button className="Button mb-4">
              Delete Project
            </button>
            <button className="Button">
              Chat
            </button>
          </div>
        </div>

        <div className="bg-content m-3 p-2" id="SecondaryContent">
          <div className="w-100">
            <button className="Button">
              Skills
            </button>
          </div>
        </div>
      </div>
    </div>
  </Template>
);

};
export default Profile;
