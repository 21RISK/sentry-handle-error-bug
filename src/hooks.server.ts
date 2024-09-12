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
});

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle());

const myErrorHandler: HandleServerError = ({}) => {
  console.log('Lets ignore error - i.e. we are NOT reporting');
  return;
};

export const handleError = Sentry.handleErrorWithSentry(myErrorHandler);
