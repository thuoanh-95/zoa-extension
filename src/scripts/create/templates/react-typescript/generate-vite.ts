import indent from "../../utils/indent";

export default function (options: any) {
  return indent(
    0,
    `
    import { defineConfig } from 'vite'
    import react from "@vitejs/plugin-react";

    // https://vitejs.dev/config/
    export default () => {
        return defineConfig({
            root: './src',
            base: '',
            plugins: [react()],
        })
    }
    `
  );
}
