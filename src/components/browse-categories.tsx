import Link from "next/link";

const categories = [
    {
        label: "Houses for sale near you",
        href: "/search?type=House",
        gradient: "from-sky-400 to-blue-600",
        icon: "🏠",
    },
    {
        label: "Open houses near you",
        href: "/search?status=New",
        gradient: "from-emerald-400 to-teal-600",
        icon: "🚪",
    },
    {
        label: "New construction",
        href: "/search?status=New",
        gradient: "from-orange-400 to-red-500",
        icon: "🏗️",
    },
    {
        label: "Coming soon",
        href: "/search",
        gradient: "from-violet-400 to-purple-600",
        icon: "🔜",
    },
    {
        label: "Recent home sales",
        href: "/search?status=Sold",
        gradient: "from-rose-400 to-pink-600",
        icon: "📈",
    },
];

export function BrowseCategories() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
                <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                    Browse homes in your area
                </h2>
                <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {categories.map((cat) => (
                        <Link
                            key={cat.label}
                            href={cat.href}
                            className="group relative flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all hover:-translate-y-0.5 hover:zillow-shadow-lg overflow-hidden bg-white border border-gray-200 zillow-shadow"
                        >
                            <span className="text-3xl mb-3">{cat.icon}</span>
                            <p className="text-sm font-semibold text-gray-800 leading-snug">
                                {cat.label}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
