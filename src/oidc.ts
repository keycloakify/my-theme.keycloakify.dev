import { createReactOidc } from "oidc-spa/react";

const host= "http://localhost:8080";
const realm= "myrealm";
const clientId= "myclient";

export const { OidcProvider, useOidc } = createReactOidc({
    issuerUri: `${host}/realms/${realm}`,
    clientId: clientId,
    publicUrl: import.meta.env.BASE_URL
});

export const keycloakAccountUrl = `${host}/realms/${realm}/account?referrer=${clientId}&referrer_uri=${window.location.origin}`;


