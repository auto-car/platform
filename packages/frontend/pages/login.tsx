import { PageHeader } from "../components/page-header";
import { LoginScreen } from "../screens/auth/login-screen";

export default function Login() {
  return (
    <>
      <PageHeader title="AutoCAR | Login" />
      <LoginScreen />
    </>
  );
}
