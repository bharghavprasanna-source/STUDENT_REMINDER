import "./globals.css";
import Navbar from "../components/Navbar";
import FloatingAddButton from "../components/common/FloatingAddButton";

export const metadata = {
  title: "Student Reminder App",
  description: "Assignment and event reminder for students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <FloatingAddButton />
      </body>
    </html>
  );
}
