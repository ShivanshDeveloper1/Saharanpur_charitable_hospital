"use client";

import { useState } from "react";
import Link from "next/link";
import { NavItem } from "@/data/NavbarData";

type MobileMenuProps = {
  items: NavItem[];
};

const MobileMenu = ({ items }: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <div className="lg:hidden">
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/40"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
          )}
        </svg>
      </button>

      {/* Dropdown Panel (sits under the nav bar) */}
      {open && (
        <div className="absolute left-0 top-full z-50 max-h-[80vh] w-full overflow-y-auto border-t border-white/10 bg-primary-dark px-4 pb-5 pt-2 shadow-xl">
          <ul className="flex flex-col">
            {items.map((item: NavItem) => (
              <li key={item.label} className="border-b border-white/10">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      aria-expanded={expanded === item.label}
                      className="flex w-full items-center justify-between py-3 text-left font-medium text-white"
                    >
                      {item.label}
                      <svg
                        className={`h-4 w-4 transition-transform duration-200 ${
                          expanded === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {expanded === item.label && (
                      <ul className="mb-3 flex flex-col gap-1 rounded-xl bg-white/5 p-2">
                        {item.children.map((child: NavItem) => (
                          <li key={child.label}>
                            <Link
                              href={child.href || "#"}
                              onClick={close}
                              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-100 transition-colors hover:bg-white/10"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href || "#"}
                    onClick={close}
                    className="block py-3 font-medium text-white"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={close}
            className="mt-4 w-full rounded-2xl bg-accent-red px-6 py-3 font-bold text-text-light shadow-md transition-all duration-300 hover:bg-red-700 active:scale-95"
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;