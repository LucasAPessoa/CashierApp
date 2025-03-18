import { Outlet } from "react-router-dom";
import { ReactElement } from "react";
function LoginLayout(): ReactElement {
    return (
        <div className="bg-bgPrimary text-textPrimary flex min-h-screen items-center justify-center overflow-hidden">
            <Outlet />;
        </div>
    );
}

export default LoginLayout;
