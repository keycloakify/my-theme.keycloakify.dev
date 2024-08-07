import { useOidc, keycloakAccountUrl } from "oidc";
import { GlobalStyles } from "tss-react";
import { tss } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { OidcProvider } from "oidc";
import Divider from "@mui/material/Divider";
import ToolTip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";

export function App() {

    return (
        <OidcProvider
            ErrorFallback={({ initializationError }) => (
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
            )}
            fallback={
                <Typography variant="h4">
                    Redirecting to your local Keycloak server...
                </Typography>
            }
        >
            <ContextualizedApp />
        </OidcProvider>
    );

}

export function ContextualizedApp() {

    const { logout, goToAuthServer, backFromAuthServer, oidcTokens } = useOidc();

    /*
    const backFromAuthServer = {
        extraQueryParams: {
            kc_action: "UPDATE_PROFILE"
        },
        result: {
            kc_action_status: "cancelled"
        }
    };
    */


    const { theme, classes } = useStyles();

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
                <div className={classes.content}>
                    <Typography variant="h2">
                        You are now authenticated as <strong>{oidcTokens.decodedIdToken.preferred_username}</strong>
                    </Typography>

                    <br />
                    <Divider />
                    <br />
                    <Typography variant="h6">
                        Decoded JWT of the Open ID Connect ID token:
                    </Typography>
                    <pre>
                        {JSON.stringify(oidcTokens.decodedIdToken, null, 2)}
                    </pre>
                    <br />
                    <Divider />
                    <br />

                    <Typography variant="h6">
                        App-initiated actions
                    </Typography>
                    <Typography variant="body1">
                        Actions that you can initiate from your App when the user is authenticated.
                        {" "}<Link target="_blank" href="https://docs.oidc-spa.dev/documentation/user-account-management">Learn more</Link>. <br />
                        They will redirect to pages of your <strong>login theme</strong>. (Not to the account theme)
                    </Typography>

                    <div className={classes.appInitiatedActionsButtonsWrapper}>


                        <div className={classes.appInitiatedActionButton}>
                            <Button
                                onClick={() => goToAuthServer({
                                    extraQueryParams: {
                                        kc_action: "UPDATE_PASSWORD"
                                    }
                                })}
                                variant="outlined"
                            >
                                Update password
                            </Button>
                            {backFromAuthServer?.extraQueryParams.kc_action === "UPDATE_PASSWORD" && (
                                (() => {
                                    switch (backFromAuthServer.result.kc_action_status) {
                                        case "success":
                                            return (
                                                <Alert severity="success">
                                                    Password updated
                                                </Alert>
                                            );
                                        case "cancelled":
                                            return (
                                                <Alert severity="info">
                                                    Password update cancelled
                                                </Alert>
                                            );
                                    }
                                })()
                            )}
                        </div>
                        <div className={classes.appInitiatedActionButton}>
                            <Button
                                onClick={() => goToAuthServer({
                                    extraQueryParams: {
                                        kc_action: "UPDATE_PROFILE"
                                    }
                                })}
                                variant="outlined"
                            >
                                Update profile
                            </Button>
                            {backFromAuthServer?.extraQueryParams.kc_action === "UPDATE_PROFILE" && (
                                (() => {
                                    switch (backFromAuthServer.result.kc_action_status) {
                                        case "success":
                                            return (
                                                <Alert severity="success">
                                                    Profile updated
                                                </Alert>
                                            );
                                        case "cancelled":
                                            return (
                                                <Alert severity="info">
                                                    Profile unchanged
                                                </Alert>
                                            );
                                    }
                                })()
                            )}
                        </div>
                        <ToolTip title={
                            <Typography variant="body2">
                                If this doesn't work on your Keycloak server it's because the account deletion feature is disabled by default.
                                {" "}<Link target="_blank" href="https://docs.oidc-spa.dev/resources/usage-with-keycloak">
                                    See how to enable it.
                                </Link> (Bottom of the documentation page)
                            </Typography>
                        }>
                            <Button
                                className={classes.appInitiatedActionButton}
                                color="error"
                                onClick={() => goToAuthServer({
                                    extraQueryParams: {
                                        kc_action: "delete_account"
                                    }
                                })}
                                variant="outlined"
                            >
                                Delete account
                            </Button>
                        </ToolTip>

                    </div>

                    <br />
                    <Divider />
                    <br />

                    <Typography variant="h6">
                        Access to your account theme
                    </Typography>
                    <Typography variant="body1">
                        If you are implementing a login theme, it's accessible at the following URL:
                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <Link href={keycloakAccountUrl} target="_blank" rel="noopener noreferrer">
                            {keycloakAccountUrl}
                        </Link>
                    </Typography>

                    <br />
                    <Divider />
                    <br />

                    <div className={classes.bottomWrapper}>
                        <Button
                            onClick={() => logout({ redirectTo: "home" })}
                            startIcon={<LogoutIcon />}
                            variant="outlined"
                        >
                            Logout and return to login pages
                        </Button>
                        <br />
                        <Typography variant="caption">
                            The source code of this test application is available at{" "}
                            <Link target="_blank" href="https://github.com/keycloakify/my-theme.keycloakify.dev/">
                                keycloakify/my-theme
                            </Link>
                        </Typography>
                    </div>
                </div>
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
            padding: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
            "&:hover": {
                boxShadow: `inset 0 0 0.5px 1px hsla(0, 0%,  
                    100%, 0.075),
                    0 0 0 1px hsla(0, 0%, 0%, 0.05),
                    0 0.3px 0.4px hsla(0, 0%, 0%, 0.02),
                    0 0.9px 1.5px hsla(0, 0%, 0%, 0.045),
                    0 3.5px 6px hsla(0, 0%, 0%, 0.09);`
            },

        },
        decodedIdToken: {
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.shape.borderRadius
        },
        appInitiatedActionsButtonsWrapper: {
            display: "flex",
            alignItems: "baseline",
            gap: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2)
        },
        appInitiatedActionButton: {
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: theme.spacing(2)
        },
        bottomWrapper: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end"
        }
    }));
