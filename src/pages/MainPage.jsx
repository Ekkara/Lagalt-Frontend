import keycloak from "../keycloak";
import Main from "../components/views/Main";

function MainPage() {

    return (
        <div>
            {keycloak.tokenParsed &&
                <>
                    <Main />
                </>
            }
        </div>
    );
}

export default MainPage;
