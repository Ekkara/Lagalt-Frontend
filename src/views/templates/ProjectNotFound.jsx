import React from "react";
import "../../components/Template/TemplateStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";

const ProjectNotFound = (props) => {
  return (
    <>
      <div className="py-0 my-0 px-2">
        <div className="bg-container mt-2 px-3 pt-3 pb-1  rounded-10">
          <h2>The project you are looking for could not be found!</h2>
          <h3>
            The project either doesn't exist, have been removed or we are unable
            to reach our servers, incase of the latter please try again in a
            moment.
          </h3>
        </div>
      </div>
    </>
  );
};
export default ProjectNotFound;
