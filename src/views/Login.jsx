import { useEffect } from "react";
import { useNavigate } from "react-router";
import keycloak from "../keycloak";

const Login = () => {
  const navigate = useNavigate();
useEffect(() => {
    if (keycloak.authenticated) {
      navigate("/Main")
    }
  }, [])
  return (
    <div>
      <h1>Login</h1>
      <h3>[insert login on this page]</h3>
      <section className="actions">
        {!keycloak.authenticated && (
          <button onClick={() => keycloak.login()}>Login</button>
        )}
        {keycloak.authenticated && (          
          <button onClick={() => keycloak.logout()}>Logout</button>
        )}
      </section>
    </div>
  );
};
export default Login;

