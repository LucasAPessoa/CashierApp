import { ReactElement } from "react";
import LoginContainer from "../components/layout/LoginContainer";
import ThemeToggler from "../components/ui/ThemeToggler";

function LoginPage(): ReactElement {
    return (
        <div className="bg-bgPrimary flex w-screen flex-col items-center justify-center">
            <LoginContainer />
            <ThemeToggler />
        </div>
    );
}

export default LoginPage;
