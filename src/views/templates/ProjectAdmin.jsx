import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import "../../components/Project/ProjectStyle.css";
import { Row, Col } from "react-bootstrap";
import "../../components/Profile/Profile.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getAdminView, removeUserFromProject } from "../../api/project";

const ProjectAdmin = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAdminView(projectId);
        setData(data);
      } catch {
        setData(null);
      }
    };
    fetchData();
  }, [projectId]);

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

    console.log(formData);

    axios
      .put("https://localhost:7132/api/Projects/" + projectId, {
        projectName: formData.projectName,
        description: formData.projectDescription,
        categoryName: formData.projectCategoryName,
        isAvailable: !(formData.projectAvailability === false),
        repositoryLink: formData.projectRepositoryLink,
      })
      .then(async () => {
        const data = await getAdminView(projectId);
        setData(data);
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  };

  const deleteProject = () => {
    if (
      window.confirm(
        "Are you sure you wish to delete this project? This can't be undone!"
      )
    ) {
      axios.delete("https://localhost:7132/api/Projects/" + projectId);
      navigate("/");
    }
  };

  const removeMember = async (userId) => {
    await removeUserFromProject(userId, projectId);
    const data = await getAdminView(projectId);
    setData(data);
  };

  function MemberItem(props) {
    //return the one item in a given format
    return (
      <Link to={`/profile/${props.member.id}`} className="link">
        <div className="border border-dark bg-container rounded-10 px-2 position-relative">
          <h4> {props.member.userName}</h4>
          {props.member.id !== data.ownerId && (
            <button
              className="bg-light rounded-10 px-2 removeKey"
              onClick={() => {
                removeMember(props.member.id);
              }}
            >
              X
            </button>
          )}
        </div>
      </Link>
    );
  }

  const acceptApplicant = (applicantId) => {
    console.log("accept1");
    axios
      .put(
        `https://localhost:7132/api/Projects/${applicantId}/AcceptProjectApplication`,
        {}
      )
      .then(async () => {
        const data = await getAdminView(projectId);
        setData(data);
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
    console.log("accept2");
  };

  const declineApplicant = (applicantId) => {
    console.log("decline 1");
    axios
      .put(
        `https://localhost:7132/api/Projects/${applicantId}/RemoveProjectApplicationFromProject`,
        {}
      )
      .then(async () => {
        const data = await getAdminView(projectId);
        setData(data);
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
    console.log("decline 2");
  };

  function ApplicantItem(props) {
    //return the one item in a given format
    return (
        <Link to={`/profile/${props.applicant.applicantId}`} className="link">
      <div className="border border-dark rounded-10 px-2 mb-1">
        <h5>{props.applicant.applicantName}</h5>
        <p> {props.applicant.message} </p>

        <button onClick={() => acceptApplicant(props.applicant.id)}>
          Accept
        </button>
        <button onClick={() => declineApplicant(props.applicant.id)}>
          Decline
        </button>
      </div>
        </Link>
    );
  }

  if (!projectId) {
    return (
      <div>
        <h3>Please select a project first.</h3>
      </div>
    );
  }

  return (
    <div>
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
                    defaultValue={data.description}
                    {...register("projectDescription")}
                  />

                  <h4>Project's repositoryLink:</h4>
                  <input
                    className="mb-4"
                    style={{ width: "100%" }}
                    defaultValue={data.repositoryLink}
                    {...register("projectRepositoryLink")}
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
                  <h4>Allow Applications</h4>
                  <input
                    type="checkbox"
                    defaultChecked={data.isAvailable}
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
              <div className="bg-container mt-2 p-1 rounded-10 members">
                <h3>Applicants:</h3>
                {data.applications && (
                  <p>
                    Amount of unsorted applicants: {data.applications.length}
                  </p>
                )}
                <div style={{ height: "250px", overflow: "auto" }}>
                  {data.applications &&
                    data.applications.map((item, index) => (
                      <ApplicantItem key={index} applicant={item} />
                    ))}
                </div>
              </div>
              <Link to="/Main">Go back to the main page</Link>
            </div>
          </div>
          <div className="bg-frame m-3">
            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button" onClick={displayEditForm}>
                  Edit Project
                </button>
                <button className="Button" onClick={deleteProject}>
                  Delete Project
                </button>
              </div>
            </div>

            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button">Group Chat</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ProjectAdmin;
