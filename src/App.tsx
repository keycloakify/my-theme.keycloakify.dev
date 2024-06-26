import { useEffect } from "react";
import { useOidc, keycloakAccountUrl } from "oidc";
import { GlobalStyles } from "tss-react";
import { tss } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";

export function App() {

    const { isUserLoggedIn, login, logout, initializationError, oidcTokens } = useOidc();

    const { theme, classes } = useStyles();

    useEffect(() => {
        if (!isUserLoggedIn && !initializationError) {
            login({
                doesCurrentHrefRequiresAuth: false
            });
        }
    }, []);

    return (
        <>
            <GlobalStyles styles={{
                "html, body": {
                    margin: 0,
                    padding: 0,
                },
                body: {
                    backgroundColor: theme.palette.background.default
                }
            }} />
            <main className={classes.root}>
                {(() => {

                    if (!isUserLoggedIn) {

                        if (initializationError) {
                            return (
                                <Alert severity="error" title={initializationError.type}>
                                    {(() => {
                                        switch (initializationError.type) {
                                            case "server down":
                                                return (
                                                    <>
                                                        Your local Keycloak doesn't seem to be up and running.<br />
                                                        To start it, simply run the following command in the root directory of your Keycloakify project:<br />
                                                        <code>npx keycloakify start-keycloak</code><br />
                                                        Or, if you are in a monorepo:<br />
                                                        <code>npx keycloakify start-keycloak --project packages/keycloak-theme</code>&nbsp;(for example)<br />
                                                    </>
                                                );
                                            case "bad configuration":
                                                return (
                                                    <>
                                                        You've modified the configuration of the Keycloak server in a way that is incompatible with
                                                        <Link target="_blank" href="https://github.com/keycloakify/my-theme.keycloakify.dev">
                                                            this test application
                                                        </Link>.
                                                    </>
                                                );
                                            case "unknown":
                                                return initializationError.message;
                                        }
                                    })()}
                                </Alert>
                            );
                        }

                        return (
                            <Typography variant="h4">
                                Redirecting to your local Keycloak server...
                            </Typography>
                        );
                    }

                    return (
                        <div className={classes.content}>
                            <Typography variant="h2">
                                You are now authenticated.
                            </Typography>
                            <Typography variant="body1">
                                Decoded OIDC ID Token JWT:
                            </Typography>
                            <pre>
                                {JSON.stringify(oidcTokens.decodedIdToken, null, 2)}
                            </pre>
                            <Typography variant="body1">
                                If you are implementing an account theme, it's accessible here:
                                <Link href={keycloakAccountUrl} target="_blank" rel="noopener noreferrer">
                                    {keycloakAccountUrl}
                                </Link>
                            </Typography>
                            <Button
                                onClick={() => logout({ redirectTo: "home" })}
                                variant="contained"
                            >
                                Logout and return to login pages
                            </Button>
                            <Typography variant="caption">
                                The source code of this test application is available here:
                                <Link target="_blank" href="https://github.com/keycloakify/my-theme.keycloakify.dev/">
                                    keycloakify/my-theme
                                </Link>
                            </Typography>
                        </div>
                    );

                })()}
            </main>
        </>

    );

}

const useStyles = tss
    .withName({ App })
    .create(({ theme }) => ({
        root: {
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& code": {
                color: theme.palette.text.primary,
                fontSize: "0.9em",
                "&::before, &::after": {
                    content: `"\`"`
                }
            }
        },
        content: {
            backgroundColor: theme.palette.background.paper,
            padding: theme.spacing(4)
        },
        decodedIdToken: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius
        }
    }));
