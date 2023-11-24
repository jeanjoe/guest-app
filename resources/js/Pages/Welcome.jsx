import { CheckCircleOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link, Head } from "@inertiajs/react";
import { map } from "lodash";

export default function Welcome({ auth }) {
    const services = [
        {
            title: "NEW TICKET",
            key: "create",
            url: "/services",
        },
        {
            title: "TICKET STATUS",
            key: "status",
            url: "/ticket-status",
        },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="relative sm:flex sm:justify-center sm:items-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-end">
                    {auth.user ? (
                        <Link
                            href={route("dashboard")}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route("login")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route("register")}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>

                <div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center">
                        <CheckCircleOutlined height={128} />
                        <div className="text-4xl text-emerald-500 dark:text-slate-200 font-extrabold">
                            NEED A SERVICE? BOOK YOUR TICKET NOW!
                        </div>
                    </div>

                    <div className="mt-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {map(services, (service) => (
                                <Link
                                    key={service.key}
                                    href={service.url}
                                    className="scale-100 text-center p-6 bg-white dark:border-white dark:border-4 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                                >
                                    <div className="border m-auto h-16 w-16 bg-red-50 dark:bg-red-800/20 dark:text-indigo-50 flex items-center justify-center rounded-full">
                                        <SolutionOutlined height={64} />
                                    </div>

                                    <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-white">
                                        {service.title}
                                    </h2>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
