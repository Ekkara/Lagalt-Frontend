import { Link } from "react-router-dom";
import { projectById } from "../components/_Temp/FakeDataBase";

function htmlProject(props) {
  //return the one item in a given format
  return (
    <div className="bg-white py-0 my-0 px-2">
      <h1>{props.project.name}</h1>
      <p>{props.project.description}</p>
    </div>
  );
}

const Project = ({ projectId }) => {
    const project = projectById(projectId);
    console.log(projectId);
   console.log(project);
    return (
      <div>
        {project && (
          <div className="bg-white py-0 my-0 px-2">
            <h1>{project.name}</h1>
            <p>{project.description}</p>
            <Link to="/Main">Go back to the main page</Link>
          </div>
        )}
      </div>
    );
  };
  
  export default Project;