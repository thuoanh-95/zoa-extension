// Import React and ReactDOM
import "./index.css";
import "./app.scss";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./containers/app";

const root = createRoot(document.getElementById("app")!);

root.render(App());
