import keycloak from '../keycloak';

export const getUserInfo = async () => {
    try {
        // Refresh token if it is expired or will expire soon
        if (keycloak.token && keycloak.isTokenExpired()) {
            await keycloak.updateToken();
        }

        const response = await fetch("https://localhost:7089/api/v1/Users", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + keycloak.token
            }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};