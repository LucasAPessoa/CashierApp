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
            className="text-textPrimary h-8 w-36 rounded-2xl bg-blue-700"
            formMethod={method}
            onClick={onClickFunc}
        >
            {innerText}
        </button>
    );
}

export default FormButton;
