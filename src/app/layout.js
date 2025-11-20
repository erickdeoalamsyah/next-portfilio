// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "Eric Deo Alamsyah - Fullstack Web Developer",
//   description: "Portfolio website of Eric Deo Alamsyah, a skilled fullstack web developer specializing in creating dynamic and responsive web applications.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
import { Orbitron } from "next/font/google";
import "./globals.css";

// Mengimpor font Orbitron
const orbitron = Orbitron({
  variable: "--font-orbitron", // Beri nama variabel yang sesuai
  subsets: ["latin"],
});

export const metadata = {
  title: "Eric Deo Alamsyah - Fullstack Web Developer",
  description: "Portfolio website of Eric Deo Alamsyah, a skilled fullstack web developer specializing in creating dynamic and responsive web applications.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}