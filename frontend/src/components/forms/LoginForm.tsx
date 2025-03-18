import FormButton from "../buttons/FormButton";
import TextInput from "../inputs/TextInput";

function LoginForm() {
    return (
        <form
            action="get"
            className="flex flex-col items-center justify-center gap-3 py-2.5"
        >
            <h1 className="text-2xl font-bold">Entre com sua conta:</h1>
            <title>LogIn</title>
            <label htmlFor="">User or Email:</label>
            <TextInput />
            <label htmlFor="">Password:</label>
            <TextInput />
            <FormButton
                method="post"
                innerText="logIn"
                onClickFunc={() => {}}
            ></FormButton>
        </form>
    );
}
export default LoginForm;
