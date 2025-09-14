import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "AI Knowledge Assistant",
  description: "Your personal AI knowledge assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        <SidebarProvider>
          <AppSidebar />

          <div className="flex-2 flex flex-col">
            <SidebarTrigger />
            <main className="flex-1  ">{children}
            </main>
          </div>

        </SidebarProvider>
      </body>
    </html>
  );
}



