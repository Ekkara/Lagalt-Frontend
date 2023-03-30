import { Link, Navigate, useNavigate } from "react-router-dom";
import UserDetails from "../../components/UserDetails/userDetail";
import NavigationMenu from "../../components/Navbar/NavigationMenu";
import "../../components/Template/TemplateStyle.css";
import keycloak from "../../keycloak";
import { BsFillHouseFill } from "react-icons/bs";

//AiFillHome
//a template that can be applied to any page, uses two parameters
//one to display the main content and one for any additional aside content
const Template = ({ mainContent, asideContent }) => {
  const navigate = useNavigate();
  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className="site-container">
      <header style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button onClick={handleHomeClick} style={{ backgroundColor: "gray" }}>
          <BsFillHouseFill
            style={{ color: "white", marginRight: "5px", fontSize: "30px" }}
          />
        </button>

        <div className="right" style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <UserDetails />
          {keycloak.authenticated ? (
            <NavigationMenu />
          ) : (
            <button
              onClick={() => keycloak.login()}
            >
              Login
            </button>
          )}
        </div>
      </header>
      <div className="d-flex same-height">
        <aside>{asideContent}</aside>
        <main>{mainContent}</main>
      </div>
    </div>
  );
};
export default Template;
