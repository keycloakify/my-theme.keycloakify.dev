import { oidcSpa } from "oidc-spa/react-spa";

export const { bootstrapOidc, OidcInitializationGate, OidcInitializationErrorGate, useOidc } = oidcSpa
  .withExpectedDecodedIdTokenShape({
    decodedIdTokenSchema: {
      parse: (decodedIdToken) =>
        decodedIdToken as { preferred_username: string } & Record<
          string,
          unknown
        >,
    },
    decodedIdToken_mock: {
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
      email: "testuser@gmail.com",
    },
  })
  .withAutoLogin()
  .createUtils();

(() => {
  if (import.meta.env.DEV) {
    bootstrapOidc({
      implementation: "mock",
      issuerUri_mock: "http://localhost:8080/realms/myrealm",
      clientId_mock: "myclient",
    });
    return;
  }

  const getParam = (params: { name: string; defaultValue: string }) => {
    const { name, defaultValue } = params;

    const value = new URLSearchParams(window.location.search).get(name);

    if (value !== null) {
      sessionStorage.setItem(name, value);
      return value;
    }

    const storedValue = sessionStorage.getItem(name);

    if (storedValue !== null) {
      return storedValue;
    }

    return defaultValue;
  };

  const realm = getParam({ name: "realm", defaultValue: "myrealm" });
  const port = getParam({ name: "port", defaultValue: "8080" });
  const kcHttpRelativePath = getParam({
    name: "kcHttpRelativePath",
    defaultValue: "",
  });

  const issuerUri = `http://localhost:${port}${kcHttpRelativePath}/realms/${realm}`;

  const clientId = getParam({ name: "client", defaultValue: "myclient" });

  bootstrapOidc({
    implementation: "real",
    issuerUri,
    clientId,
    debugLogs: true,
  });
})();
