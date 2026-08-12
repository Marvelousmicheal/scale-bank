import { Suspense } from "react"
import { AuthShell } from "@/components/auth/AuthShell"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <AuthShell title="Welcome back" description="Sign in to manage Scale Bank operations.">
        <Suspense fallback={<div className="h-72 animate-pulse rounded-xl bg-white/5" />}>
          <LoginForm />
        </Suspense>
    </AuthShell>
  )
}
