import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import MemberItem from "../../components/Project/MemberItem";
import { getNonSecretProjectView } from "../../api/project";
import keycloak from "../../keycloak";

const ProjectNotLoggedIn = (props) => {
  const { projectId } = props;
  const [data, setData] = useState({});

  //on page loaded, fetch the project data that is available for not logged in users
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

  return (
    <div>
      {data && (
        <div id="Content">
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
              <div className="w-100">
                {data.isAvailable && (
                  <button className="Button" onClick={()=>keycloak.login()}>
                    Join Project
                  </button>
                )}
                {!data.isAvailable && (
                  <button className="Button bg-secondary">Join Project</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectNotLoggedIn;
