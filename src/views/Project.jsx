import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FakeDB, projectById } from "../components/_Temp/FakeDataBase";

const Project = () => {
  const [database, editDataBase] = FakeDB();
  const { projectId } = useParams();
  const [project] = useState(database[projectId - 1]); //TODO: this only work in a perfect structure db, we will use getbyId functions instead
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
