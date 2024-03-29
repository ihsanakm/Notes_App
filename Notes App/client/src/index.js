import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./components/authStore";
import { BrowserRouter } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <Provider store={store}>
            <App />
    </Provider>
    </BrowserRouter>
)