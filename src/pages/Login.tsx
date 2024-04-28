import { useState } from "react";
import Button from "../ui/Button";
import Logo from "../ui/Logo";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white p-6 w-[90%] sm:w-[450px] rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Logo />
      <LoginHeader />
      <InputForm>
        <InputRow label="E-Mail" type="email" />
        <InputRow label="Passwort" type="password" />
        <LoginButton />
      </InputForm>
    </div>
  );
}

export default Login;

function LoginHeader() {
  return (
    <h2 className="font-semibold text-lg mb-6 mt-5 text-center">
      Bitte loggen Sie sich ein
    </h2>
  );
}

function InputForm({ children }: { children: React.ReactNode }) {
  return <form>{children}</form>;
}

function InputRow({ label, type }: { label: string; type: string }) {
  return (
    <div className="flex flex-col my-4">
      <label htmlFor={type}>{label}</label>
      <input
        className="h-9 rounded-md border border-indigo-300 p-2"
        type={type}
        name={type}
      />
    </div>
  );
}

function LoginButton() {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
  }

  return (
    <Button
      content="Login"
      variation="standard"
      size="md"
      extras="rounded-lg w-full h-12"
      onClick={(e) => handleClick(e)}
    />
  );
}
