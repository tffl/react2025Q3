import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom",
        setupFiles: "./vitest.setup.ts",
        css: true,
        coverage: { reporter: ["text", "html"], thresholds: { statements: 0.8 } },
    },
});
