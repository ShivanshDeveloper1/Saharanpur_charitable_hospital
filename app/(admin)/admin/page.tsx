// Admin bogs
import Link from "next/link";
import {
  FileText,
  Sparkles,
  MapPin,
  ArrowRight,
} from "lucide-react";

const cards = [
  {
    title: "All Posts",
    description: "Manage your blog articles and drafts.",
    href: "/admin/posts",
    icon: FileText,
  },
  {
    title: "AI Blog Generator",
    description: "Generate location-focused articles with AI.",
    href: "/admin/generator",
    icon: Sparkles,
  },
  {
    title: "Local SEO",
    description: "Manage cities, localities, and keywords.",
    href: "/admin/local-seo",
    icon: MapPin,
  },
];

export default function AdminDashboard() {
  return (
    <div className="mx-auto max-w-7xl p-6 md:p-10">
      <div className="mb-8">
        <p className="text-sm font-medium text-blue-600">
          Workspace
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Manage your AI-powered blogging workflow.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                  <Icon size={22} />
                </div>

                <ArrowRight
                  size={18}
                  className="text-gray-400 transition group-hover:translate-x-1 group-hover:text-blue-600"
                />
              </div>

              <h2 className="mt-5 font-semibold text-gray-900">
                {card.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                {card.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
