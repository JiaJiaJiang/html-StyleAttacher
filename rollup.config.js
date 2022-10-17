import babel from "@rollup/plugin-babel";
import { nodeResolve } from '@rollup/plugin-node-resolve';
export default {
	input: ["./src/index.js"],
	output: {
		file: "./dist/StyleAttacher.js",
		format: "umd",
		name: "StyleAttacher",
	},
	plugins: [babel(),nodeResolve()],
}