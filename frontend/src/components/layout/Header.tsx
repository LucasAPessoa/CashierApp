import { ReactElement } from "react";
import ThemeToggler from "../ui/ThemeToggler";

function Header(): ReactElement {
    return (
        <header
            className={
                "flex h-20 w-screen max-w-screen items-center justify-between px-4 text-xl"
            }
        >
            <div>
                <h1>CashierApp</h1>
            </div>
            <div>
                <nav>
                    <ul className="flex flex-row items-center gap-8">
                        <li>Home</li>
                        <li>Controle de caixa</li>
                        <li>Cadastros</li>
                    </ul>
                </nav>
            </div>
            <div>
                <ThemeToggler />
            </div>
        </header>
    );
}

export default Header;
