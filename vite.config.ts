import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const PORT = env.VITE_PORT ?? 3000;

  return {
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENV),
    },

    publicDir: "public",

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          ["design-system"]: resolve(__dirname, "pages", "design-system.html"),
        },
      },
    },

    server: {
      port: +PORT,
      open: true,
    },
  };
});
