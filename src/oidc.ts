import { createReactOidc } from "oidc-spa/react";
import { createMockReactOidc } from "oidc-spa/mock/react";

let keycloakAccountUrl: string;

export const { OidcProvider, useOidc } = (() => {

    const isAuthGloballyRequired = true;

    const publicUrl = import.meta.env.BASE_URL;

    if (import.meta.env.DEV) {

        keycloakAccountUrl = `http://localhost:8080/realms/myream/account?referrer=myclient&referrer_uri=${window.location.origin}`;

        return createMockReactOidc({
            isUserInitiallyLoggedIn: true,
            isAuthGloballyRequired,
            publicUrl,
            mockedTokens: {
                decodedIdToken: {
                    "exp": 1722824053,
                    "iat": 1722823753,
                    "auth_time": 1722823752,
                    "jti": "fcfbe727-9420-439a-b735-d01cf873fd2d",
                    "iss": "http://localhost:8080/realms/myrealm",
                    "aud": "myclient",
                    "sub": "d93e1772-4916-4243-850f-a6d9b2615716",
                    "typ": "ID",
                    "azp": "myclient",
                    "sid": "40f34d36-75cc-4934-a347-8c7522ddd935",
                    "at_hash": "JOhzt7rCARGvf894-gZZmA",
                    "acr": "1",
                    "email_verified": true,
                    "gender": "prefer_not_to_say",
                    "name": "Test User",
                    "favourite_pet": "cat",
                    "preferred_username": "testuser",
                    "locale": "en",
                    "given_name": "Test",
                    "family_name": "User",
                    "email": "testuser@gmail.com"
                }
            },
        });

    }

    const host = `http://localhost:${(new URLSearchParams(window.location.search)).get("port") ?? "8080"}`;
    const realm = new URLSearchParams(window.location.search).get("realm") ?? "myrealm";
    const clientId = new URLSearchParams(window.location.search).get("client") ?? "myclient";
    keycloakAccountUrl = `${host}/realms/${realm}/account?referrer=${clientId}&referrer_uri=${window.location.origin}`;

    return createReactOidc({
        issuerUri: `${host}/realms/${realm}`,
        clientId,
        publicUrl,
        isAuthGloballyRequired,
        decodedIdTokenSchema: {
            parse: decodedIdToken => decodedIdToken as { preferred_username: string; }
        }
    });

})();

export { keycloakAccountUrl };




