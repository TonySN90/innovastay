import Logo from "../ui/Logo";
import LoginForm from "../features/authentication/LoginForm";

function Login() {
  return (
    <div className="bg-white p-6 w-[90%] sm:w-[450px] rounded-lg absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl">
      <Logo />
      <LoginHeader />
      <LoginForm />
    </div>
  );
}

export default Login;

function LoginHeader() {
  return <h2 className="font-semibold text-lg text-center">Login</h2>;
}
