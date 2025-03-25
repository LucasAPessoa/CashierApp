import FormButton from "../buttons/FormButton";
import TextInput from "../inputs/TextInput";

function LoginForm() {
    return (
        <div className="flex h-full flex-1 flex-col items-center justify-center overflow-hidden">
            <form
                action="get"
                className="flex flex-1 flex-col items-center justify-center gap-3 py-2.5"
            >
                <h1 className="text-3xl font-bold">Enter with your account:</h1>
                <title>LogIn</title>
                <label htmlFor="" className="text-lg">
                    User or Email:
                </label>
                <TextInput />
                <label htmlFor="" className="text-lg">
                    Password:
                </label>
                <TextInput />
                <FormButton
                    method="post"
                    innerText="LogIn"
                    onClickFunc={() => {}}
                ></FormButton>
            </form>
        </div>
    );
}
export default LoginForm;
