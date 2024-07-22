import indent from "../../utils/indent";

export default function () {
  let scripts = "";

  scripts += indent(
    0,
    `
          // Import React and ReactDOM
          import React from 'react';
          import { createRoot } from 'react-dom/client';
  
          // Mount React App
          const root = createRoot(document.getElementById('app'));
          root.render(React.createElement(App));
        `
  );

  return scripts.trim();
}
