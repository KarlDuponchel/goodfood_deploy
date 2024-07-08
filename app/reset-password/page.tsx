import { ResetPasswordForm } from "@/containers/Reset/ResetPasswordForm";

export const metadata = {
  title: "Changement de mot de passe",
};

export default function ResetPassword() {
  return (
    <div className="bg-bg-food w-full bg-cover h-screen grid place-items-center">
      <ResetPasswordForm />
    </div>
  );
}
