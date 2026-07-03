import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AllTechs - Solusi Teknologi Digital Terintegrasi",
  description: "AllTechs adalah mitra teknologi digital terpercaya Anda. Kami menyediakan layanan pengembangan website, mobile app, cloud, dan integrasi AI.",
  icons: {
    icon: "/logo-alltechs.png",
    shortcut: "/logo-alltechs.png",
    apple: "/logo-alltechs.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${poppins.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-950 transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
        
        {/* Floating WhatsApp Button */}
        <a
          href="https://wa.me/628121900888"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 focus:outline-hidden"
          aria-label="Chat WhatsApp"
        >
          <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.635-1.022-5.11-2.884-6.974C16.58 1.9 14.11 .876 11.487.876c-5.436 0-9.86 4.421-9.864 9.865-.001 1.737.478 3.428 1.388 4.93L1.932 21.05l5.715-1.5.022-.012-.022.012zm11.366-8.254c-.328-.164-1.94-.957-2.24-1.066-.3-.11-.518-.164-.736.164-.218.328-.846 1.066-1.037 1.284-.19.218-.38.245-.71.082-.328-.164-1.386-.51-2.64-1.627-.977-.87-1.636-1.946-1.827-2.273-.19-.328-.02-.505.143-.668.147-.146.328-.382.49-.573.164-.19.218-.328.328-.546.11-.218.055-.41-.027-.573-.082-.164-.736-1.774-1.01-2.434-.267-.641-.53-.554-.736-.564-.19-.01-.41-.01-.628-.01s-.573.082-.873.41c-.3.328-1.145 1.12-1.145 2.73s1.173 3.166 1.336 3.385c.164.218 2.308 3.525 5.59 4.945.78.337 1.39.54 1.86.689.782.248 1.494.213 2.057.129.627-.094 1.94-.792 2.212-1.558.273-.766.273-1.422.19-1.558-.08-.135-.3-.218-.627-.382z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
