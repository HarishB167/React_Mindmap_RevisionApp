import { init as rInit, captureException } from "@sentry/browser";

const dsnUrl =
  "https://b34234b0744d4f489b4bafb85e1ff26b@o524432.ingest.sentry.io/6196240";

function init() {
  rInit({
    dsn: dsnUrl,
    release: "0-0-1",
    environment: "development-test",
  });
}

function log(error) {
  captureException(error);
}

export default {
  init,
  log,
};
