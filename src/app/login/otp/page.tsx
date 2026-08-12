import { AuthShell } from "@/components/auth/AuthShell"
import { PublicAuthForm } from "@/components/auth/PublicAuthForm"

export default function OtpLoginPage() {
  return <AuthShell title="Sign in with OTP" description="Use the verification code sent to your registered phone number."><PublicAuthForm mode="otp" /></AuthShell>
}
