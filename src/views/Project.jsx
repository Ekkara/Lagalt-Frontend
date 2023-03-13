import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Template from "./templates/Template";
import axios from 'axios'

const Project = () => {
  const [data, setData] = useState({
    projectName: "",
    projectDescription: ""
  })
  const { projectId } = useParams();
 
  useEffect(() => {
    getData();
  },[projectId]);

  const getData = async () => {
    await axios.get('https://localhost:7132/api/Projects/'+projectId)
      .then((result) =>{
        console.log(result.data);
        setData(result.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <Template>
      {data && (
        <div className="py-0 my-0 px-2">
          <h1>{data.projectName}</h1>
          <p>{data.projectDescription}</p>
          <Link to="/Main">Go back to the main page</Link>
        </div>
      )}
    </Template>
  );
};
export default Project;
