import localFont from "next/font/local";
import { Orbitron } from "next/font/google"; // Import Orbitron font
import { VT323 } from "next/font/google"; // Import VT323 from next/font/google
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModelProvider from "../providers/ModelProvider";
import { RegistrationProvider } from "../lib/RegistrationContext";

// Local fonts
const iceberg = localFont({
  src: "/fonts/Iceberg.ttf",  // Path to the font file in the public folder
  variable: "--font-iceberg",
  weight: "400",  // Adjust this based on your font's weight (if applicable)
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const ethnocentric = localFont({
  src: "./fonts/Ethnocentric.otf",  // Path to the .otf file
  variable: "--font-ethnocentric",
  weight: "10",  // Adjust this based on your font weight
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Google Fonts: Orbitron
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Select the weights you want
  variable: "--font-orbitron",
});

export const metadata = {
  title: "BitByte",
  description:
    "Tech event in Islamic University of Science & Technology, Awantipora",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${ethnocentric.variable} ${iceberg.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <RegistrationProvider>
          <ToastContainer />
          <ModelProvider />

          {children}
        </RegistrationProvider>
      </body>
    </html>
  );
}
