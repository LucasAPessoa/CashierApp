import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

import Header from "../components/layout/Header";

function MainLayout(): ReactElement {
    return (
        <div className="bg-bgPrimary text-textPrimary width-full min-h-screen overflow-hidden">
            <Header />
            <Outlet />
        </div>
    );
}

export default MainLayout;
