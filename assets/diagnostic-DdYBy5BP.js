import{b as h,O as s,d as f}from"./main-DiiZGx-8.js";import{W as u}from"./index-BAny9aEN.js";import"./index-CbpMpV_D.js";import"./urlSearchParams-BS7x-Top.js";function d(a){return fetch(a).then(async e=>{if(!e.ok)return!1;try{await e.json()}catch{return!1}return!0},()=>!1)}async function m(a){const{issuerUri:e}=a,n=["The OIDC server is either down or the issuerUri you provided is incorrect.",`You provided the issuerUri: ${e}`,`Endpoint that couldn't be reached: ${e}${u}`].join(`
`);if(!h({issuerUri:e}))return new s({messageOrCause:[n,"","If you happen to be using Keycloak, be aware that the issuerUri you provided doesn't match the expected shape.","It should look like: https://<YOUR_KEYCLOAK_DOMAIN><KC_HTTP_RELATIVE_PATH>/realms/<YOUR_REALM>","Unless configured otherwise the KC_HTTP_RELATIVE_PATH is '/' by default on recent version of Keycloak."].join(`
`),isAuthServerLikelyDown:!0});const t=f({issuerUri:e}),o=i=>{const{kcHttpRelativePath:c}=i;return`${t.issuerUriParsed.origin}${c??""}/realms/${encodeURIComponent(t.issuerUriParsed.realm)}`};if(t.issuerUriParsed.kcHttpRelativePath===void 0){const i=o({kcHttpRelativePath:"/auth"});if(await d(`${i}${u}`))return new s({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/auth",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${i}`,"(You are missing the /auth portion)"].join(`
`),isAuthServerLikelyDown:!1})}else{const i=o({kcHttpRelativePath:void 0});if(await d(`${i}${u}`))return new s({messageOrCause:["Your Keycloak server is configured with KC_HTTP_RELATIVE_PATH=/",`The issuerUri you provided: ${e}`,`The correct issuerUri is: ${i}`,`(You should remove the ${t.issuerUriParsed.kcHttpRelativePath} portion.)`].join(`
`),isAuthServerLikelyDown:!1})}return new s({messageOrCause:[n,"","Given the shape of the issuerUri you provided, it seems that you are using Keycloak.",`- Make sure the realm '${t.issuerUriParsed.realm}' exists.`,"- Check the KC_HTTP_RELATIVE_PATH that you might have configured your keycloak server with.",`  For example if you have KC_HTTP_RELATIVE_PATH=/xxx the issuerUri should be ${o({kcHttpRelativePath:"/xxx"})}`].join(`
`),isAuthServerLikelyDown:!0})}async function w(a){const{redirectUri:e,issuerUri:n,clientId:t}=a;t:{if(await d(`${n}${u}`))break t;return m({issuerUri:n})}t:{const o=await fetch(e).then(r=>r.ok?{"Content-Security-Policy":r.headers.get("Content-Security-Policy"),"X-Frame-Options":r.headers.get("X-Frame-Options")}:new Error(`${e} responded with a ${r.status} status code.`),r=>r);if(o instanceof Error)return new s({isAuthServerLikelyDown:!1,messageOrCause:new Error("Unexpected error while trying to diagnose why the silent sign-in process timed out.",{cause:cspOrError})});const i=o;let c=(()=>{e:{const r="Content-Security-Policy",l=i[r];if(l===null||!l.replace(/["']/g,"").replace(/\s+/g," ").toLowerCase().includes("frame-ancestors none"))break e;return r}e:{const r="X-Frame-Options",l=i[r];if(l===null||!l.toLowerCase().includes("deny"))break e;return r}})();if(c===void 0)break t;return new s({isAuthServerLikelyDown:!1,messageOrCause:[`${e} is currently served by your web server with the HTTP header \`${c}: ${i[c]}\`.
`,`This header prevents the silent sign-in process from working.
`,"Refer to this documentation page to fix this issue: https://docs.oidc-spa.dev/v/v8/resources/third-party-cookies-and-session-restoration"].join(" ")})}return new s({isAuthServerLikelyDown:!1,messageOrCause:[`The silent sign-in process timed out.
`,`Based on the diagnostic performed by oidc-spa the more likely causes are:
`,`- Either the client ID "${t}" does not exist, or
`,`- You forgot to add the OIDC callback URL to the list of Valid Redirect URIs.
`,`Client ID: "${t}"
`,`Callback URL to add to the list of Valid Redirect URIs: "${e}"

`,...(()=>{if(!h({issuerUri:n}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const o=f({issuerUri:n});return[`It seems you are using Keycloak. Follow these steps to resolve the issue:

`,`1. Go to the Keycloak admin console: ${o.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${o.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Locate the client "${t}" in the list and click on it.
`,`6. Find "Valid Redirect URIs" and add "${e}" to the list.
`,`7. Save the changes.

`,"For more information, refer to the documentation: https://docs.oidc-spa.dev/v/v8/providers-configuration/keycloak"]})(),`

`,`If nothing works, you can try disabling the use of iframe: https://docs.oidc-spa.dev/resources/iframe-related-issues
`,"with some OIDC provider it might solve the issue."].join(" ")})}async function C(a){const{issuerUri:e,clientId:n}=a;t:{if(await d(`${e}${u}`))break t;return m({issuerUri:e})}return new s({isAuthServerLikelyDown:!1,messageOrCause:[`Failed to fetch the token endpoint.
`,`This is usually due to a CORS issue.
`,`Make sure you have added '${window.location.origin}' to the list of Web Origins`,`in the '${n}' client configuration of your OIDC server.
`,`
`,...(()=>{if(!h({issuerUri:e}))return["Check the documentation of your OIDC server to learn how to configure the public client (Authorization Code Flow + PKCE) properly."];const t=f({issuerUri:e});return[`Since it seems that you are using Keycloak, here are the steps to follow:
`,`1. Go to the Keycloak admin console: ${t.adminConsoleUrl_master}
`,`2. Log in as an admin user.
`,`3. In the top left corner select the realm "${t.issuerUriParsed.realm}".
`,`4. In the left menu, click on "Clients".
`,`5. Find '${n}' in the list of clients and click on it.
`,`6. Find 'Web Origins' and add '${window.location.origin}' to the list.
`,`7. Save the changes.

`,"More info: https://docs.oidc-spa.dev/v/v8/providers-configuration/keycloak"]})()].join(" ")})}export{C as createFailedToFetchTokenEndpointInitializationError,w as createIframeTimeoutInitializationError,m as createWellKnownOidcConfigurationEndpointUnreachableInitializationError};
