import Image from "next/image";
import Link from "next/link";
import { navData, NavItem } from "@/data/NavbarData";
import MobileMenu from "./MobileMenu";


const Navbar = () => {
  return (
    <header className="w-full shadow-md">
      {/* Top Banner / Announcement Bar */}
      <div className="w-full border-b border-slate-200 bg-bg-light text-text-dark">
        <div className="mx-auto flex min-h-12 max-w-7xl items-center justify-center gap-3 px-4 py-2 sm:gap-5">
          <span className="text-center text-xs font-bold sm:text-base">
            Purchase Today & Enjoy Up To 35% Off
          </span>

          <div className="hidden w-16 shrink-0 animate-pulse sm:block">
            <svg
              viewBox="0 0 70 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full text-accent-red"
            >
              <path
                d="M2 8 C20 8, 35 8, 45 20 C50 26, 56 28, 64 27"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M56 20 L65 27 L56 34"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <a
            href="tel:+917618550475"
            className="shrink-0 rounded-full bg-accent-red px-4 py-1.5 text-xs font-bold text-surface shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md active:scale-95 sm:px-6 sm:py-2 sm:text-base"
          >
            Call Now
          </a>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="relative bg-primary-dark">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            href="/"
            className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface p-2 shadow-sm transition-transform hover:scale-105 sm:h-20 sm:w-20"
          >
            <Image
              src="/schrai_remove.png"
              fill
              sizes="(max-width: 640px) 48px, 80px"
              alt="SCHARI logo"
              className="object-contain p-1.5"
            />
          </Link>

          {/* Desktop Navigation (lg and up) */}
          <div className="hidden items-center gap-6 lg:flex">
            {navData.map((item: NavItem) => (
              <div key={item.label} className="group relative">
                {item.href ? (
                  <Link
                    href={item.href}
                    className="font-medium text-white transition-colors hover:text-slate-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="cursor-pointer py-2 font-medium text-white">
                    {item.label}
                  </span>
                )}

                {/* Dropdown Menu for Items with Children */}
                {item.children && (
                  /* Top-padding acts as an invisible bridge so hover never breaks */
                  <div className="pointer-events-none invisible absolute left-0 top-full z-50 w-64 translate-y-2 pt-3 opacity-0 transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-2 shadow-2xl ring-1 ring-black/5">
                      {/* Top Accent Highlight Bar */}
                      <div className="-mx-2 -mt-2 mb-1 h-1 rounded-t-2xl bg-gradient-to-r from-accent-red via-red-500 to-amber-500" />

                      <div className="px-3 pb-1 pt-2 text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                        Medical Specialties
                      </div>

                      <div className="flex flex-col gap-1">
                        {item.children.map((child: NavItem) => (
                          <Link
                            key={child.label}
                            href={child.href || "#"}
                            className="group/item flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:translate-x-1 hover:bg-slate-50 hover:text-accent-red"
                          >
                            <span className="flex items-center gap-2.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-300 transition-all duration-300 group-hover/item:w-3 group-hover/item:bg-accent-red" />
                              {child.label}
                            </span>

                            <svg
                              className="h-4 w-4 -translate-x-2 text-accent-red opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button className="rounded-2xl bg-accent-red px-6 py-3 font-bold text-text-light shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent-red/50 active:scale-95">
              Book Appointment
            </button>
          </div>

          {/* Mobile / Tablet Menu (below lg) */}
          <MobileMenu items={navData} />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;