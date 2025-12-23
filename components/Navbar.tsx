"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Add Tasks", href: "/add-tasks" },
  { name: "Calendar", href: "/calendar" },
  { name: "Profile", href: "/profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav
      className="
        flex h-16 items-center
        px-8 py-4
        bg-white dark:bg-gray-900
        border-b border-gray-300 dark:border-gray-700
      "
    >
      {/* App Title */}
      <div className="flex items-center mr-12">
        <Link
          href="/"
          className="text-xl font-bold text-black dark:text-white cursor-pointer hover:opacity-80 transition"
        >
          Student Reminder
        </Link>
      </div>

      {/* Navigation Buttons */}
      <div className="flex h-full items-center gap-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link key={item.name} href={item.href}>
              <button
                className={`
                  inline-flex items-center h-10 justify-center
                  px-6 py-2.5 
                  rounded-lg
                  text-sm font-semibold
                  transition-all duration-150
                  cursor-pointer select-none
                  active:scale-95

                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
                  }
                `}
              >
                {item.name}
              </button>
            </Link>
          );
        })}
      </div>

      {/* Right side controls */}
      <div className="ml-auto flex h-full items-center pl-6">
        <ThemeToggle />
      </div>
    </nav>
  );
}
