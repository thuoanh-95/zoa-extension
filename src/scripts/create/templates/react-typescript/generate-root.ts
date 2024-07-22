import indent from "../../utils/indent";

export default function generateRoot(options: any) {
  return indent(
    0,
    `
        import React, { useEffect } from 'react';

        const App = () => {
            return <div>App</div>
        }

        export default App;
        `
  ).trim();
}
