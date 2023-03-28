import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { Row, Col } from "react-bootstrap";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import MemberItem from "../../components/Project/MemberItem";
import { getNonSecretProjectView, sendApplication } from "../../api/project";
import { currentUserId } from "../../keycloak";

const ProjectLoggedIn = (props) => {
  const { projectId } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getNonSecretProjectView(projectId);
        setData(data);
      } catch {
        setData(null);
      }
    };
    fetchData();
  }, [projectId]);

  const [showJoinForm, setShowJoinForm] = useState(false);
  const cantJoinAlert = () => {   
      alert(
        "Sorry but this project does not accept any open applications at this time."
      );
   };

  const displayJoinForm = () => {
    setShowJoinForm(true);
  };

  const hideJoinForm = () => {
    setShowJoinForm(false);
  };
  const { register, handleSubmit } = useForm();
  const submitJoinForm = async (formData) => {
    setShowJoinForm(false);
    const data ={
        applicantId: currentUserId,
        message: formData.message,
      }
    
    sendApplication(projectId, data)
  };

  return (
    <div>
      Logged in
      {data && (
        <div id="Content">
          {showJoinForm && (
            <div>
              <div className="dark" onClick={hideJoinForm}></div>
              <div className="aboveDark bg-container">
                <form onSubmit={handleSubmit(submitJoinForm)}>
                  <h4>Please enter a message or motivation for them to select you:</h4>
                  <textarea
                    className="mb-4"
                    {...register("message")}
                  />
                  <p>By confirming this, you agree that the admins of this project will be able to see your profile, even if it is set to being hidden </p>
                  <Row>
                    <Col>
                      <button className="w-100" type="submit">
                        Confirm
                      </button>
                    </Col>
                    <Col>
                      <button className="w-100" onClick={hideJoinForm}>
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
              <div className="bg-container mt-2 px-3 pt-3 pb-1  rounded-10">
                <h1>{data.projectName}</h1>
                <p> (Project type: {data.categoryName})</p>
              </div>
              <div className="bg-container mt-2 px-1 rounded-10 description">
                <p>{data.description}</p>
              </div>
              <div className="bg-container mt-2 p-1 rounded-10 members">
                <h3>Collaborators:</h3>
                <div style={{ height: "200px", overflow: "auto" }}>
                  {data.members &&
                    data.members.map((item) => (
                      <MemberItem key={item.id} member={item} />
                    ))}
                </div>
              </div>
              <Link to="/Main">Go back to the main page</Link>
            </div>
          </div>
          <div className="bg-frame m-3">
            <div className="bg-content m-3 p-2" id="SecondaryContent">
              {data.isAvailable && (
                <div className="w-100">
                  <button className="Button" onClick={displayJoinForm}>Join Project</button>
                </div>
              )}
              {!data.isAvailable && (
                <div className="w-100">
                  <button className="Button bg-secondary"onClick={cantJoinAlert}>Join Project</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectLoggedIn;
