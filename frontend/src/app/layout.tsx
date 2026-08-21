import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/store/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "JawadShop | Find Clothes That Match Your Style",
  description: "Browse through our diverse range of meticulously crafted garments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              `(function(){try{var els=document.querySelectorAll('*');for(var i=0;i<els.length;i++){var el=els[i];var names=(el.getAttributeNames&&el.getAttributeNames())||[];for(var j=0;j<names.length;j++){var n=names[j];if(n&&n.indexOf('bis_skin_checked')===0){el.removeAttribute(n);}}} }catch(e){} })();`,
          }}
        />
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}