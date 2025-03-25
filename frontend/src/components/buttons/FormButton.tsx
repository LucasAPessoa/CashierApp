import { MouseEventHandler } from "react";

function FormButton({
    innerText,
    method,
    onClickFunc,
}: {
    innerText: string;
    method: string;
    onClickFunc: MouseEventHandler;
}) {
    return (
        <button
            className="text-btnTextPrimary h-10 w-36 rounded-full bg-blue-700 text-xl"
            formMethod={method}
            onClick={onClickFunc}
        >
            {innerText}
        </button>
    );
}

export default FormButton;
