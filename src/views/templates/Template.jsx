import { Link } from "react-router-dom";
import UserDetails from "../../components/UserDetails/userDetail";
import NavigationMenu from "../../components/Navbar/NavigationMenu";
import "../../components/Template/TemplateStyle.css";
import keycloak from "../../keycloak";

//a template that can be applied to any page, uses two parameters
//one to display the main content and one for any additional aside content
const Template = ({ mainContent, asideContent }) => {
  return (
    <div className="site-container">
      <header>
          <Link to="/" className="btn btn-primary">
            home
          </Link>
          <UserDetails />

          <div className="right">
            {keycloak.authenticated ? (
              <NavigationMenu />
            ) : (
              <button
                className="btn btn-primary"
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
