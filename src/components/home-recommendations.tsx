import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function HomeRecommendations() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Left side - CTA */}
                    <div className="flex-1">
                        <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
                            Get home recommendations
                        </h2>
                        <p className="mt-4 text-lg text-gray-500 max-w-md">
                            Sign in for a more personalized experience.
                        </p>
                        <Link
                            href="/auth"
                            className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-[#006AFF] px-6 py-3 text-sm font-bold text-[#006AFF] hover:bg-[#006AFF] hover:text-white transition-colors"
                        >
                            Sign in
                        </Link>
                    </div>

                    {/* Right side - Floating cards mock */}
                    <div className="flex-1 relative">
                        <div className="relative h-[320px] w-full max-w-[500px] mx-auto">
                            {/* Background property image */}
                            <div className="absolute right-0 top-8 w-[280px] h-[260px] rounded-xl overflow-hidden zillow-shadow-lg">
                                <div className="w-full h-full bg-gradient-to-br from-amber-100 to-orange-200 flex items-end p-4">
                                    <div className="bg-white rounded-lg p-3 w-full zillow-shadow">
                                        <p className="text-lg font-bold text-gray-900">$695,000</p>
                                        <p className="text-xs text-gray-500 mt-0.5">4 bd | 3 ba | 3,102 sqft | House for Sale</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recommendation badge 1 */}
                            <div className="absolute left-0 top-0 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 zillow-shadow-lg">
                                <span className="grid size-8 place-items-center rounded-full bg-orange-500 text-white">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Recommended homes</p>
                                    <p className="text-xs text-gray-500">based on your monthly budget</p>
                                </div>
                            </div>

                            {/* Recommendation badge 2 */}
                            <div className="absolute left-8 top-16 z-10 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 zillow-shadow-lg">
                                <span className="grid size-8 place-items-center rounded-full bg-red-500 text-white">
                                    <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-bold text-gray-900">Recommended homes</p>
                                    <p className="text-xs text-gray-500">based on your preferred location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
