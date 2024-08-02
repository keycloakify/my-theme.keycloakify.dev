import { createReactOidc } from "oidc-spa/react";

const host = `http://localhost:${(new URLSearchParams(window.location.search)).get("port") ?? "8080"}`;
const realm = new URLSearchParams(window.location.search).get("realm") ?? "myrealm";
const clientId = new URLSearchParams(window.location.search).get("client") ?? "myclient";

export const { OidcProvider, useOidc } = createReactOidc({
    issuerUri: `${host}/realms/${realm}`,
    clientId: clientId,
    publicUrl: import.meta.env.BASE_URL,
    isAuthGloballyRequired: true
});

export const keycloakAccountUrl = `${host}/realms/${realm}/account?referrer=${clientId}&referrer_uri=${window.location.origin}`;


