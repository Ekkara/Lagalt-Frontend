import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../components/Profile/Profile.css";
import "../../components/Template/TemplateStyle.css";


function ProjectForm({
  placeholderName,
  placeholderDescription,
  placeholderProjectType,
  confirmButtonText,
  handleSubmit,
  handleCancel,
  register,
}) {
  return (
    <div>
      <div className="dark" onClick={handleCancel}></div>
      <div className="aboveDark bg-container">
        <form onSubmit={handleSubmit}>
          <h4>Project's name:</h4>
          <input
            className="mb-4"
            placeholder={placeholderName}
            {...register("projectName", {
              required: true,
              minLength: 5,
              maxLength: 50,
            })}
          />

          <h4>Project's description:</h4>
          <textarea
            className="mb-4"
            placeholder= {placeholderDescription}
            {...register("projectDescription")}
          />

          <h4>Project type</h4>
          <select value={placeholderProjectType}
            className="mb-4 w-100"
            id="Project type"
            {...register("projectCategoryName")}
          >
            <option value="Game">Game</option>
            <option value="Music">Music</option>
          </select>
          <Row>
            <Col>
              <button className="w-100" type="submit">
                {confirmButtonText}
              </button>
            </Col>
            <Col>
              <button className="w-100" onClick={handleCancel}>
                Cancel
              </button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
}
export default ProjectForm;