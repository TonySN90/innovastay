import { Dispatch, SetStateAction, useState } from "react";
import Button from "../../ui/Button";
import useLogin from "./useLogin";
import { LoadingTypes } from "../../types/GlobalTypes";
import MiniSpinner from "../../ui/MiniSpinner";

function LoginForm() {
  const [email, setEmail] = useState("tony@example.com");
  const [password, setPassword] = useState("ged33njv");

  const { loginUser, loadingStatus } = useLogin();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) return;

    loginUser({ email, password });
  }

  return (
    <form onSubmit={handleSubmit}>
      <InputRow label="E-Mail" type="email" value={email} setValue={setEmail} />
      <InputRow
        label="Passwort"
        type="password"
        value={password}
        setValue={setPassword}
      />
      <LoginButton loadingStatus={loadingStatus} />
    </form>
  );
}

export default LoginForm;

function InputRow({
  label,
  type,
  value,
  setValue,
}: {
  label: string;
  type: string;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={type}>{label}</label>
      <input
        className="h-9 rounded-md border border-indigo-300 p-2"
        type={type}
        name={type}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
      />
    </div>
  );
}

function LoginButton({ loadingStatus }: { loadingStatus: string }) {
  const isLoading = loadingStatus === LoadingTypes.LOADING;

  return isLoading ? (
    <MiniSpinner alignment="center" />
  ) : (
    <Button
      content="Login"
      variation="standard"
      size="md"
      extras="rounded-lg w-full h-12"
      disabled={isLoading}
    />
  );
}
