import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = env.VITE_PORT ?? 3000;

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },

    publicDir: "assets",

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          ["design-system"]: resolve(__dirname, "pages", "design-system.html"),
          ["destination"]: resolve(__dirname, "pages", "destination.html"),
          ["crew"]: resolve(__dirname, "pages", "crew.html"),
          ["technology"]: resolve(__dirname, "pages", "technology.html"),
        },
      },
    },

    server: {
      port: +PORT,
      open: true,
    },
  };
});
