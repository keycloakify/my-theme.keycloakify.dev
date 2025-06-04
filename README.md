# my-theme.keycloakify.dev

Minimal web app to help you access your login and account pages on your local Keycloak instance.  
This web app is similar to: https://keycloak.org/app/  

You are invited to access the deployment of this web app when you run 
the following command in you [Keycloakify](https://www.keycloakify.dev) project:  

```bash
npx keycloakify start-keycloak
```

This web app is using [oidc-spa](https://oidc-spa.dev/) to automatically redirect 
you to your Keycloak login pages, it assumes that:  

- Your Keycloak instance is running on `http://localhost:8080`  
- You have a realm named `myrealm`  
- You have a client named `myclient` with:  
  - Valid redirect URIs: `https://my-theme.keycloakify.dev/*`, `http://localhost*` (localhost is if you are running this web app locally)  
  - Valid post logout redirect URIs: `https://my-theme.keycloakify.dev/*`, `http://localhost*` 

You can changes those default values using query params, for example:
`http://localhost:5173/?realm=myrealm&port=8080&client=myclient&kcHttpRelativePath=/auth`  
(The only thing that you can't change is that the Keycloak is assumed to be running on your localhost.)

To learn more heads over to [the Keycloakify homepage](https://www.keycloakify.dev/).
