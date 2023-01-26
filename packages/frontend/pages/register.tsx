import { PageHeader } from "../components/page-header";
import { RegisterScreen } from "../screens/auth/register-screen";

export default function Register() {
  return (
    <>
      <PageHeader title="AutoCAR | Register" />
      <RegisterScreen />
    </>
  );
}
