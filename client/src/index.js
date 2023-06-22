import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Context} from "./context";
import {GoogleOAuthProvider} from "@react-oauth/google"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>  
    <Context>
    <GoogleOAuthProvider
                clientId={`629276647431-fkp21j2gcmlbgab54449eml4k2vkflob.apps.googleusercontent.com`}>
    <App /> 
    </GoogleOAuthProvider>
    </Context>
  </React.StrictMode>
);
