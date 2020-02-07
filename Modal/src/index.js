import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './index.css';
import {Provider} from "react-redux";
import configureStore from "./redux/configureStore";

const store = configureStore();

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById("root"));