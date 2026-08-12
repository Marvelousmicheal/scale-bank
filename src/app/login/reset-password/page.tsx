import { AuthShell } from "@/components/auth/AuthShell"
import { PublicAuthForm } from "@/components/auth/PublicAuthForm"

export default function ResetPasswordPage() {
  return <AuthShell title="Choose a new password" description="Enter the six-digit code and your new password."><PublicAuthForm mode="reset" /></AuthShell>
}
