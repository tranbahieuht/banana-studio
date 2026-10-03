import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import BrandIntro from "@/components/BrandIntro";
import ScrollProgress from "@/components/ScrollProgress";
import FloatingZalo from "@/components/FloatingZalo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://banana.studio"),
  title: {
    default: "Banana Studio — Biến ý tưởng thành sản phẩm số",
    template: "%s | Banana Studio",
  },
  description:
    "Banana Studio thiết kế và phát triển website, sản phẩm số cùng những trải nghiệm tương tác có chủ đích.",
  keywords: [
    "Banana Studio",
    "Banana Group",
    "thiết kế website",
    "phát triển sản phẩm số",
    "studio công nghệ",
    "thiết kế trải nghiệm",
    "tích hợp trí tuệ nhân tạo",
    "Next.js",
    "React",
    "software architecture",
  ],
  authors: [{ name: "Banana Technology Studio" }],
  creator: "Banana Technology Studio",
  icons: {
    icon: "/assets/logo-symbol.png",
    apple: "/assets/logo-symbol.png",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://banana.studio",
    siteName: "Banana Studio",
    title: "Banana Studio — Biến ý tưởng thành sản phẩm số",
    description:
      "Một studio công nghệ tại Việt Nam. Thiết kế và phát triển những trải nghiệm số có cá tính.",
    images: [
      {
        url: "/assets/logo.png",
        width: 1536,
        height: 1024,
        alt: "Logo Banana Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Banana Studio — Biến ý tưởng thành sản phẩm số",
    description: "Thiết kế và phát triển những trải nghiệm số có cá tính.",
    images: ["/assets/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/assets/logo-symbol.png" />
        <meta name="theme-color" content="#F7F7F3" />
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{
          __html: `let saved = null; try { saved = localStorage.getItem('banana-studio-theme'); } catch {} const dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches); document.documentElement.dataset.theme = dark ? 'dark' : 'light'; document.documentElement.style.colorScheme = dark ? 'dark' : 'light'; document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#10110F' : '#F7F7F3');`,
        }} />
      </head>
      <body className="antialiased">
        <BrandIntro />
        <CustomCursor />
        <ScrollProgress />
        <FloatingZalo />
        {children}
      </body>
    </html>
  );
}
