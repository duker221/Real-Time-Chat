import Rollbar from "rollbar";

const rollbar = new Rollbar({
  accessToken: "fd6802c05f5845b8b9fb9ae1a176887e",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

export default rollbar;
