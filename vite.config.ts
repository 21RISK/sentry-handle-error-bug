import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        unstable_sentryVitePluginOptions: {
          release: {
            setCommits: {
              auto: true,
            },
          },
        },
        org: "21risk",
        project: "debug-http-405",
      },
    }),
    sveltekit(),
  ],
});
