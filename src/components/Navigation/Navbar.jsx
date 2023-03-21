import { Link } from "react-router-dom";
import {keycloak, initialize} from "../../keycloak";

function Navbar() {
  const handleLoginClick = () => {
    keycloak.init({ onLoad: "login-required" }).then((authenticated) => {
      if (!authenticated) {
        window.location.reload();
      } else {
        console.log("Authenticated");
      }
    });
  };

  return (
    <nav>
      {/* <Link to="/">Main</Link> */}
      {/* <button onClick={handleLoginClick}>Login</button> */}
    </nav>
  );
}

export default Navbar;
