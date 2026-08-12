import { AuthShell } from "@/components/auth/AuthShell"
import { PublicAuthForm } from "@/components/auth/PublicAuthForm"

export default function ForgotPasswordPage() {
  return <AuthShell title="Reset your password" description="Enter the email or phone number connected to your account."><PublicAuthForm mode="forgot" /></AuthShell>
}
