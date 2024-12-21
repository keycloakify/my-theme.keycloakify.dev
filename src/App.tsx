import { useOidc, readRealm } from "oidc";
import { tss } from "tss-react/mui";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import { OidcProvider } from "oidc";
import Divider from "@mui/material/Divider";
import ToolTip from "@mui/material/Tooltip";
import LogoutIcon from "@mui/icons-material/Logout";
import CircularProgress from "@mui/material/CircularProgress";

export function App() {
  const { css } = useStyles();

  return (
    <OidcProvider
      ErrorFallback={({ initializationError }) => (
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          })}
        >
          <Alert severity="error" title={initializationError.type}>
            {(() => {
              switch (initializationError.type) {
                case "server down":
                  return (
                    <>
                      Your local Keycloak doesn't seem to be running.
                      <br />
                      If you are using uBlock Origin, or some other ad blocker,
                      it might be blocking the redirection.
                      <br />
                      Please refer to the{" "}
                      <Link
                        target="_blank"
                        href="https://docs.keycloakify.dev/testing-your-theme/in-a-keycloak-docker-container"
                      >
                        documentation
                      </Link>
                      .
                    </>
                  );
                case "bad configuration":
                  return (
                    <>
                      You've modified the configuration of the Keycloak server
                      in a way that is incompatible with
                      <Link
                        target="_blank"
                        href="https://github.com/keycloakify/my-theme.keycloakify.dev"
                      >
                        this test application
                      </Link>
                      .<br />
                      You can open the console to see the error message.
                    </>
                  );
                case "unknown":
                  return initializationError.message;
              }
            })()}
          </Alert>
        </div>
      )}
      fallback={
        <div
          className={css({
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          })}
        >
          <Typography variant="h4">
            <CircularProgress
              className={css({
                position: "relative",
                top: "0.20em",
              })}
            />
            &nbsp; Redirecting to your local Keycloak server...
          </Typography>
        </div>
      }
    >
      <ContextualizedApp />
    </OidcProvider>
  );
}

export function ContextualizedApp() {
  const {
    logout,
    goToAuthServer,
    backFromAuthServer,
    oidcTokens,
    params: { clientId, issuerUri },
  } = useOidc();

  const realm = readRealm({ issuerUri });

  const { classes } = useStyles();

  return (
    <>
      <main className={classes.root}>
        <div className={classes.content}>
          <Typography variant="h2">
            You are now authenticated as{" "}
            <strong>{oidcTokens.decodedIdToken.preferred_username}</strong>
          </Typography>

          <br />
          <Divider />
          <br />
          <Typography variant="h6">
            Decoded JWT of the Open ID Connect ID token:
          </Typography>
          <pre>{JSON.stringify(oidcTokens.decodedIdToken, null, 2)}</pre>
          <br />
          <Divider />
          <br />

          <Typography variant="h6" sx={{ mb: 2 }}>
            App-initiated actions
          </Typography>
          <Typography variant="body1">
            Actions that you can initiate from your App when the user is
            authenticated.{" "}
            <Link
              target="_blank"
              href="https://docs.oidc-spa.dev/documentation/user-account-management"
            >
              Learn more
            </Link>
            . <br />
            They will redirect to the <strong>login UI</strong>. (and not to the
            account UI)
          </Typography>

          <div className={classes.appInitiatedActionsButtonsWrapper}>
            <div className={classes.appInitiatedActionButton}>
              <Button
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: {
                      kc_action: "UPDATE_PASSWORD",
                    },
                  })
                }
                variant="outlined"
              >
                Update password
              </Button>
              {backFromAuthServer?.extraQueryParams.kc_action ===
                "UPDATE_PASSWORD" &&
                (() => {
                  switch (backFromAuthServer.result.kc_action_status) {
                    case "success":
                      return <Alert severity="success">Password updated</Alert>;
                    case "cancelled":
                      return (
                        <Alert severity="info">Password update cancelled</Alert>
                      );
                  }
                })()}
            </div>
            <div className={classes.appInitiatedActionButton}>
              <Button
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: {
                      kc_action: "UPDATE_PROFILE",
                    },
                  })
                }
                variant="outlined"
              >
                Update profile
              </Button>
              {backFromAuthServer?.extraQueryParams.kc_action ===
                "UPDATE_PROFILE" &&
                (() => {
                  switch (backFromAuthServer.result.kc_action_status) {
                    case "success":
                      return <Alert severity="success">Profile updated</Alert>;
                    case "cancelled":
                      return <Alert severity="info">Profile unchanged</Alert>;
                  }
                })()}
            </div>
            <ToolTip
              title={
                <Typography variant="body2">
                  If this doesn't work on your Keycloak server it's because the
                  account deletion feature is disabled by default.{" "}
                  <Link
                    target="_blank"
                    href="https://docs.oidc-spa.dev/resources/usage-with-keycloak"
                  >
                    See how to enable it.
                  </Link>{" "}
                  (Bottom of the documentation page)
                </Typography>
              }
            >
              <Button
                className={classes.appInitiatedActionButton}
                color="error"
                onClick={() =>
                  goToAuthServer({
                    extraQueryParams: {
                      kc_action: "delete_account",
                    },
                  })
                }
                variant="outlined"
              >
                Delete account
              </Button>
            </ToolTip>
          </div>

          <br />
          <Divider />
          <br />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Keycloak <strong>Account</strong> UI
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Link to the Keycloak Account UI for the <code>{realm}</code> realm:
          </Typography>
          <Typography variant="body1">
            {(() => {
              const url = `${issuerUri}/account?referrer=${clientId}&referrer_uri=${window.location.origin}`;

              return (
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </Link>
              );
            })()}
          </Typography>

          <br />
          <Divider />
          <br />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Keycloak <strong>Admin</strong> UI
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Link to the Keycloak Admin UI for the <code>{realm}</code> realm.
            Note that user{" "}
            <code>{oidcTokens.decodedIdToken.preferred_username}</code> has to
            have the <code>realm-admin</code> role to access this page:
          </Typography>
          <Typography variant="body1">
            {(() => {
              const url = `${new URL(issuerUri).origin}/admin/${realm}/console`;

              return (
                <Link href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </Link>
              );
            })()}
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
              <Link
                target="_blank"
                href="https://github.com/keycloakify/my-theme.keycloakify.dev/"
              >
                keycloakify/my-theme
              </Link>
            </Typography>
          </div>
        </div>
      </main>
    </>
  );
}

const useStyles = tss.withName({ App }).create(({ theme }) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& code": {
      color: theme.palette.text.primary,
      fontSize: "0.9em",
      "&::before, &::after": {
        content: `"\`"`,
      },
    },
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
                    0 3.5px 6px hsla(0, 0%, 0%, 0.09);`,
    },
    margin: theme.spacing(6)
  },
  decodedIdToken: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
  },
  appInitiatedActionsButtonsWrapper: {
    display: "flex",
    alignItems: "baseline",
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  appInitiatedActionButton: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: theme.spacing(2),
  },
  bottomWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "end",
  },
}));
