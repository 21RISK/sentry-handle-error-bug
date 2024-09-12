import { sequence } from "@sveltejs/kit/hooks";
import { sentryHandle } from "@sentry/sveltekit";
import type { HandleServerError } from "@sveltejs/kit";
import * as Sentry from "@sentry/sveltekit";

Sentry.init({
  dsn: "https://9b6c7eae9806fcf11e22a56265cac2b3@o127521.ingest.us.sentry.io/4507938758852608",
  tracesSampleRate: 1.0,
  beforeSend(event, hint) {

    console.warn(`🟡Why is Sentry's beforeSend hook is running 🟡`);


    return null;
  },

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: import.meta.env.DEV,
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

// If you have a custom error handler, pass it to `handleErrorWithSentry`

const myErrorHandler: HandleServerError = ({
  error: handledError,
  event,
  status,
  message,
}) => {
  let errId = "";

  const errMessage = `${
    (handledError as any)?.message || "handleError - no error message!"
  } (@handleError)`;

  if (status < 500) {
    console.log('Error is less than 500, so we are not sending it to Sentry');
    return;
  }
  Sentry.setContext("sveltekit", { event });

  errId = Sentry.captureException(handledError);

  console.log("🔥", errMessage, { handledError, errId });
};

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);
