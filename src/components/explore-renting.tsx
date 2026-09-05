import Link from "next/link";
import { Building2, Home, Building, Landmark } from "lucide-react";

const rentalCategories = [
    {
        label: "Apartments for rent",
        href: "/search?type=Condo&status=Rental",
        icon: Building2,
        desc: "Browse apartments and condos",
    },
    {
        label: "Houses for rent",
        href: "/search?type=House&status=Rental",
        icon: Home,
        desc: "Find single-family rentals",
    },
    {
        label: "Condos for rent",
        href: "/search?type=Condo&status=Rental",
        icon: Building,
        desc: "Discover condo rentals",
    },
    {
        label: "Townhomes for rent",
        href: "/search?type=Townhouse&status=Rental",
        icon: Landmark,
        desc: "Search townhome listings",
    },
];

export function ExploreRenting() {
    return (
        <section className="py-16 bg-white">
            <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
                <h2 className="text-2xl font-bold text-gray-900 lg:text-3xl">
                    Explore renting on AetherHomes
                </h2>
                <p className="mt-2 text-gray-500">
                    Search apartments, condos, and houses for rent.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {rentalCategories.map((cat) => {
                        const Icon = cat.icon;
                        return (
                            <Link
                                key={cat.label}
                                href={cat.href}
                                className="group flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#006AFF]/30 hover:zillow-shadow-lg hover:-translate-y-0.5"
                            >
                                <span className="grid size-12 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#006AFF] group-hover:bg-[#006AFF] group-hover:text-white transition-colors">
                                    <Icon className="size-6" />
                                </span>
                                <div>
                                    <p className="font-semibold text-gray-900">{cat.label}</p>
                                    <p className="mt-1 text-sm text-gray-500">{cat.desc}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
