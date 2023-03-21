import axios from "axios";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

class ProjectUtils {    
      static getData = (url) => {
       return axios
          .get(url)
          .then((result) => {
            return (result.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
 }
 export default ProjectUtils;