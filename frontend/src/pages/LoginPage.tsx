import { ReactElement } from "react";
import LoginContainer from "../components/layout/LoginContainer";

function LoginPage(): ReactElement {
    return (
        <div className="bg-bgPrimary flex w-screen flex-col items-center justify-center">
            <LoginContainer />
        </div>
    );
}

export default LoginPage;
