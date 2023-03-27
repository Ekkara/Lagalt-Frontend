import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Template from "./templates/Template";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import "../components/Profile/Profile.css";
import "../components/Template/TemplateStyle.css";
import { useForm } from "react-hook-form";
import {
  getUserById,
  addSkillToUser,
  updateUser,
  removeSkillFromUser,
} from "../api/user";
import keycloak, { currentUserId } from "../keycloak";
import { createProject } from "../api/project";

const Profile = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showAddSkillForm, setShowAddSkillForm] = useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = useState(false);

  const { userId } = useParams();
  const [profile, setProfile] = useState({});
  const getProfile = async (id) => {
    const data = await getUserById(id);
    setProfile(data);
    console.log(data);
  };

  useEffect(() => {
    getProfile(userId);
  }, [userId]);

  const displayCreateForm = () => {
    if (showCreateForm) setShowCreateForm(false);
    else setShowCreateForm(true);
  };
  const hideCreateForm = () => {
    setShowCreateForm(false);
  };

  const { register, handleSubmit } = useForm();

  const createProjectSubmit = async (formData) => {
    setShowCreateForm(false);

    const data = {
      ownerId: currentUserId,
      projectName: formData.projectName,
      description: formData.projectDescription,
      categoryName: formData.projectCategoryName,
      isAvailable: true,
    };
    await createProject(data);
    getProfile(currentUserId);
  };

  const displayAddSkillForm = () => {
    if (showAddSkillForm) setShowAddSkillForm(false);
    else setShowAddSkillForm(true);
  };

  const hideAddSkillForm = () => {
    setShowAddSkillForm(false);
  };

  const addSkill = async (formData) => {
    setShowAddSkillForm(false);
    await addSkillToUser(formData.skill);
    getProfile(currentUserId);
  };

  const displayEditProfileForm = () => {
    if (showEditProfileForm) setShowEditProfileForm(false);
    else setShowEditProfileForm(true);
  };
  const hideEditProfileForm = () => {
    setShowEditProfileForm(false);
  };

  const editProfile = async (formData) => {
    setShowEditProfileForm(false);
    const data = {
      description: formData.newProfileDescription,
      isProfileHiden: !(formData.newIsProfileHidden === false),
    };
    await updateUser(data);
    getProfile(currentUserId);
  };
  const removeSkill = async (name) => {
    await removeSkillFromUser(name);
    await getProfile(currentUserId);
  };
  function SkillItem(props) {
    return (
      <div className="border border-dark bg-container rounded-10 px-2 position-relative">
        <h4>{props.skill.name}</h4>
        <button className="bg-light rounded-10 px-2 removeKey"
          onClick={() => {
            removeSkill(props.skill.name);
          }}
        >
          X
        </button>
      </div>
    );
  }

  function ProjectItem(props) {
    //return the one item in a given format
    return (
      <Link to={`/project/${props.project.id}`} className="link">
        <div className="border border-dark bg-container rounded-10 px-2">
          <h4> {props.project.projectName}</h4>
          <p>{props.project.description}</p>
        </div>
      </Link>
    );
  }

  return (
    <Template>
      <div id="Content">
        {/* if creating a project  */}
        {showCreateForm && (
          <div>
            <div className="dark" onClick={hideCreateForm}></div>
            <div className="aboveDark bg-container">
              <form onSubmit={handleSubmit(createProjectSubmit)}>
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
                  <option value="Film">Film</option>
                  <option value="Web Development">Web Development</option>
                </select>
                <Row>
                  <Col>
                    <button className="w-100" type="submit">
                      Create
                    </button>
                  </Col>
                  <Col>
                    <button className="w-100" onClick={hideCreateForm}>
                      Cancel
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        )}
        {showAddSkillForm && (
          <div>
            <div className="dark" onClick={hideAddSkillForm}></div>
            <div className="aboveDark bg-container">
              <form onSubmit={handleSubmit(addSkill)}>
                <h4>New skill:</h4>
                <textarea
                  className="mb-4"
                  placeholder="Insert skill..."
                  {...register("skill", {
                    required: true,
                    minLength: 2,
                  })}
                />
                <Row>
                  <Col>
                    <button className="w-100" type="submit">
                      Add skill
                    </button>
                  </Col>
                  <Col>
                    <button className="w-100" onClick={hideAddSkillForm}>
                      Cancel
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        )}
        {showEditProfileForm && (
          <div>
            <div className="dark" onClick={hideEditProfileForm}></div>
            <div className="aboveDark bg-container">
              <form onSubmit={handleSubmit(editProfile)}>
                <h4>New description:</h4>
                <textarea
                  className="mb-4"
                  placeholder="Insert new description..."
                  defaultValue={profile.description}
                  {...register("newProfileDescription")}
                />
                <h4>Hide profile:</h4>
                <input
                  type="checkbox"
                  defaultChecked={profile.isProfileHiden}
                  {...register("newIsProfileHidden")}
                />
                <Row>
                  <Col>
                    <button className="w-100" type="submit">
                      Confirm
                    </button>
                  </Col>
                  <Col>
                    <button className="w-100" onClick={hideEditProfileForm}>
                      Cancel
                    </button>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        )}
        {/* left side */}
        <div id="PrimaryContent" className="mx-3">
          <div>
            {profile && (
              <div>
                <h3>{profile.userName}'s profile</h3>
                <div className="w-80 mx-auto">
                  {profile.profileImgSrc ? (
                    <img
                      src={profile.profileImgSrc}
                      className="w-100"
                      alt="Profile picture"
                    />
                  ) : null}
                </div>

                <h4>Profile description</h4>
                <div
                  style={{
                    minHeight: "50px",
                    maxHeight: "200px",
                    overflow: "auto",
                  }}
                  className="bg-container w-100"
                >
                  <p>{profile.description}</p>
                </div>

                {profile.displayingProfile && (
                  <div>
                    <h4>Projects</h4>
                    <div
                      style={{
                        minHeight: "50px",
                        maxHeight: "200px",
                        overflow: "auto",
                      }}
                      className="bg-container"
                    >
                      {profile.projects &&
                        profile.projects.map((item) => (
                          <ProjectItem key={item.id} project={item} />
                        ))}
                    </div>

                    <h4>Skills</h4>
                    <div
                      style={{
                        minHeight: "50px",
                        maxHeight: "200px",
                        overflow: "auto",
                      }}
                      className="bg-container"
                    >
                      {profile.skills &&
                        profile.skills.map((item) => (
                          <SkillItem key={item.id} skill={item} />
                        ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        {/* right side */}
        {currentUserId.toString() === userId && (
          <div className="bg-frame m-3">
            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button" onClick={displayCreateForm}>
                  Create Project
                </button>
              </div>
            </div>

            <div className="bg-content m-3 p-2" id="SecondaryContent">
              <div className="w-100">
                <button className="Button" onClick={displayEditProfileForm}>
                  Edit profile
                </button>
              </div>
              <div className="w-100">
                <button className="Button" onClick={displayAddSkillForm}>
                  Add skill
                </button>
              </div>
              <div className="w-100">
                <button className="Button" onClick={() => keycloak.logout()}>
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Template>
  );
};
export default Profile;
