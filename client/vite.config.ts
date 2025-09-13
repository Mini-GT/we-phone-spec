import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";


// react and bun issue - fix(https://github.com/remix-run/react-router/issues/12568)
export default defineConfig({
	base: "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  resolve:
		process.env.NODE_ENV === 'development'
			? {}
			: {
					alias: {
						'react-dom/server': 'react-dom/server.node',
					},
			  },
});
