import type { Metadata } from "next";
import { Geist, Geist_Mono, Chakra_Petch } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Add Chakra Petch via next/font and expose as --font-chakra variable */
const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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

const gilmer = localFont({
  src: [
    {
      path: "../../public/gilmer-bold/gilmer-bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-gilmer",
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
      className={`${geistSans.variable} ${geistMono.variable} ${sfPro.variable} ${gilmer.variable} ${chakra.variable}`}
      suppressHydrationWarning
    >
      <body className=" text-white font-sans antialiased bg-black">
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

