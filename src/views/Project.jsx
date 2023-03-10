import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FakeDB, projectById } from "../components/_Temp/FakeDataBase";
import Template from "./templates/Template";

const Project = () => {
  const [database, editDataBase] = FakeDB();
  const { projectId } = useParams();
  const [project] = useState(database[projectId - 1]); //TODO: this only work in a perfect structure db, we will use getById functions instead

  return (
    <Template>
      {project && (
        <div className="py-0 my-0 px-2">
          <h1>{project.name}</h1>
          <p>{project.description}</p>
          <Link to="/Main">Go back to the main page</Link>
        </div>
      )}
    </Template>
  );
};
export default Project;
