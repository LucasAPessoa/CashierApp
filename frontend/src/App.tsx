import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

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
