import React from "react";
import ReactDOM from "react-dom";

import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home";
import {Header} from "./component/Header/Header";

import "./assets/style/index.scss"
import {Notifications} from "./pages/Notifications";



ReactDOM.render(
    <BrowserRouter>
        <Header />
        <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/notifications" element={<Notifications />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
)