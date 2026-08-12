import Image from "next/image"

export function AuthShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-surface-deep px-6 py-12">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-app-black p-8 shadow-2xl shadow-black/30 sm:p-10">
        <Image src="/image/logo.svg" alt="Scale Bank" width={101} height={40} priority />
        <div className="mb-8 mt-10 space-y-2">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          <p className="text-base text-ink-muted">{description}</p>
        </div>
        {children}
      </section>
    </div>
  )
}
