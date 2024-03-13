import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 80,
    host: "0.0.0.0",
    https: {
      key: fs.readFileSync(path.join(__dirname, "../certs/client-key.pem")),
      cert: fs.readFileSync(path.join(__dirname, "../certs/client-cert.pem")),
    },
  },
});
