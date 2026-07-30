import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const sfPro = localFont({
  src: [
    {
      path: "../../public/sf-pro-display/sf-pro-regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/sf-pro-display/sf-pro-medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/sf-pro-display/sf-pro-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sf-pro",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://scalebank.com"),
	alternates: {
		canonical: "/",
	},
	appleWebApp: {
		title: "Scale Bank",
	},
	authors: [{ name: "Scale Bank" }],
	description:
		"The ultimate dashboard for managing users, businesses, POS terminals, and fast settlements.",
	formatDetection: {
		email: false,
		telephone: false,
	},
	keywords: [
		"banking",
		"dashboard",
		"fintech",
		"finance",
		"transactions",
		"scale bank"
	],
	openGraph: {
		description:
			"The ultimate dashboard for managing users, businesses, POS terminals, and fast settlements.",
		images: [
			{
				alt: "Scale Bank — Financial Dashboard",
				height: 630,
				url: "/images/og-image.png",
				width: 1200,
			},
		],
		locale: "en_US",
		siteName: "Scale Bank",
		title: "Scale Bank — Financial Dashboard",
		type: "website",
	},
	publisher: "Scale Bank",
	referrer: "origin-when-cross-origin",
	title: {
		default: "Scale Bank — Financial Dashboard",
		template: "%s — Scale Bank",
	},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={sfPro.variable}
      suppressHydrationWarning
    >
      <body className="bg-black font-sf-pro text-white antialiased">
        <div className="flex h-screen overflow-hidden">
            <Sidebar />

          <main className="bg-black flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
