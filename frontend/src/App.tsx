import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginLayout />}>
                    <Route path="/" element={<LoginPage />} />
                </Route>
                <Route path="/home" element={<MainLayout />}>
                    <Route path="/home" element={<HomePage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
