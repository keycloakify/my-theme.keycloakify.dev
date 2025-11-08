import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { oidcSpa } from "oidc-spa/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    oidcSpa({
      safeMode: true,
    }),
    tsconfigPaths(),
  ],
});
