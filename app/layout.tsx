import type { Metadata } from "next";
import { Geist } from "next/font/google";
import NavigationHeader from "@/components/sections/navigation_header";
import NotificationStrip from "@/components/ui/NotificationStrip";
import { SITE_CONFIG } from "@/config/site";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <NavigationHeader />
        <div className="pt-16">
                  <NotificationStrip />

          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
