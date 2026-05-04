import { defineConfig } from "vite";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [basicSsl()],
  server: {
    host: true,
    https: true,
    port: 8457
  },
  base: "/CRxUAL-Virtual-Exhibiton-2026/"

});
