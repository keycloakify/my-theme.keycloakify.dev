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
                    exp: 1722824053,
                    iat: 1722823753,
                    auth_time: 1722823752,
                    jti: "fcfbe727-9420-439a-b735-d01cf873fd2d",
                    iss: "http://localhost:8080/realms/myrealm",
                    aud: "myclient",
                    sub: "d93e1772-4916-4243-850f-a6d9b2615716",
                    typ: "ID",
                    azp: "myclient",
                    sid: "40f34d36-75cc-4934-a347-8c7522ddd935",
                    at_hash: "JOhzt7rCARGvf894-gZZmA",
                    acr: "1",
                    email_verified: true,
                    gender: "prefer_not_to_say",
                    name: "Test User",
                    favourite_pet: "cat",
                    preferred_username: "testuser",
                    locale: "en",
                    given_name: "Test",
                    family_name: "User",
                    email: "testuser@gmail.com"
                }
            },
        });

    }

    const getParam= (params: {
        name: string;
        defaultValue: string;
    }) => {

        const { name, defaultValue } = params;

        const value = new URLSearchParams(window.location.search).get(name);

        if( value !== null ){

            sessionStorage.setItem(name, value);
            return value;

        }

        const storedValue = sessionStorage.getItem(name);

        if( storedValue !== null ){
            return storedValue;
        }

        return defaultValue;

    };

    const realm = getParam({ name: "realm", defaultValue: "myrealm" });

    const issuerUri = (() => {

        const port = getParam({ name: "port", defaultValue: "8080" });
        const kcHttpRelativePath = getParam({ name: "kcHttpRelativePath", defaultValue: "" });

        return `http://localhost:${port}${kcHttpRelativePath}/realms/${realm}`;

    })();

    const clientId = getParam({ name: "client", defaultValue: "myclient" });
    keycloakAccountUrl = `${issuerUri}/account?referrer=${clientId}&referrer_uri=${window.location.origin}`;

    return createReactOidc({
        issuerUri,
        clientId,
        publicUrl,
        isAuthGloballyRequired,
        decodedIdTokenSchema: {
            parse: decodedIdToken => decodedIdToken as { preferred_username: string; }
        },
        doEnableDebugLogs: true
    });

})();

export { keycloakAccountUrl };




