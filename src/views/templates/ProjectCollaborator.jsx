import React from "react";
import { Link } from "react-router-dom";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import { useNavigate } from "react-router-dom";
import MemberItem from "../../components/Project/MemberItem";
import { getCollaboratorView, removeUserFromProject } from "../../api/project";
import { currentUserId } from "../../keycloak";

const ProjectCollaborator = (props) => {
    const navigate = useNavigate();
    const { projectId } = props;
    const [data, setData] = useState({
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const data = await getCollaboratorView(projectId);
          setData(data);
        } catch {
          setData(null);
        }
      };
      fetchData();
    }, [projectId]);

    //allow users to leave a project
    const leaveProjectHandler = async() =>{
      if (
        window.confirm(
          "Are you sure you wish to leave the project, you will no longer see any collaborator related information"
        )
      ) {
      await removeUserFromProject(currentUserId, projectId);
      navigate("/");
      }
    }

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
              {data.repositoryLink && (
                <div className="bg-container mt-2 p-1 rounded-10">
                  <h3>Repository:</h3> 
                    <p>{data.repositoryLink}</p>
                </div>
              )}
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
                <button className="Button">Group Chat</button>
              </div>
            </div>
            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button" onClick={leaveProjectHandler}>Leave Project</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectCollaborator;
