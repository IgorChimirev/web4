// App.js
import React, {useState, useEffect} from "react"; // Добавляем useEffect
import {BrowserRouter} from "react-router-dom";
import Navbar from "./components/UI/Navbar";
import "./styles/App.css"
import AppRouter from "./components/AppRouter";
import AuthContext from "./context/AuthContext";
import { AboutProvider } from './context/AboutContext';

import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => { // Меняем useState на useEffect
        if (localStorage.getItem("web-lab-4-authorization") === "true"
            && localStorage.getItem("web-lab-4-username") != null)
            setLoggedIn(true);
        else {
            setLoggedIn(false);
            localStorage.removeItem("web-lab-4-username");
            localStorage.removeItem("web-lab-4-authorization");
        }
        console.log(process.env.PUBLIC_URL);
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
            <AboutProvider>
                <BrowserRouter basename={process.env.PUBLIC_URL}>
                    <div className="main-container">
                        <Navbar/>
                        <AppRouter/>
                    </div>
                </BrowserRouter>
            </AboutProvider>
        </AuthContext.Provider>
    );
}