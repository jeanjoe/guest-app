import GuestLayout from "@/Layouts/GuestLayout";
import { CheckCircleOutlined, SolutionOutlined } from "@ant-design/icons";
import { Link } from "@inertiajs/react";
import { Card, Col, Row } from "antd";
import { map } from "lodash";

export default function Welcome({ auth }) {
    const services = [
        {
            title: "NEW TICKET",
            key: "create",
            url: route("tickets.new"),
            icon: <SolutionOutlined style={{ fontSize: 84 }} />,
        },
        {
            title: "TICKET STATUS",
            key: "status",
            url: route("tickets.search"),
            icon: <CheckCircleOutlined style={{ fontSize: 84 }} />,
        },
    ];

    return (
        <GuestLayout>
            <div className="text-center" style={{ marginBottom: "2em" }}>
                <span
                className="fw-bold"
                    style={{
                        background: "gray",
                        fontSize: 18,
                        color: "#fff",
                        width: "auto !important",
                    }}
                >
                    NEED A SERVICE? BOOK YOUR TICKET NOW!
                </span>
            </div>
            <Row justify="center" gutter={8}>
                {map(services, (service) => (
                    <Col md={{ span: 6 }} key={service.key}>
                        <Link
                            href={service.url}
                            className="scale-100 text-center p-6 bg-white dark:border-white dark:border-4 dark:bg-gray-800/50 dark:bg-gradient-to-bl from-gray-700/50 via-transparent dark:ring-1 dark:ring-inset dark:ring-white/5 rounded-lg shadow-2xl shadow-gray-500/20 dark:shadow-none motion-safe:hover:scale-[1.01] transition-all duration-250 focus:outline focus:outline-2 focus:outline-red-500"
                        >
                            <Card
                                bordered
                                hoverable
                                style={{
                                    backgroundColor: "#016e57",
                                    color: "white",
                                }}
                            >
                                <div className="border m-auto h-16 w-16 bg-red-50 dark:bg-red-800/20 dark:text-indigo-50 flex items-center justify-center rounded-full">
                                    {service.icon}
                                </div>

                                <h2 className="mt-6 text-6xl font-extrabold text-gray-900 dark:text-white">
                                    {service.title}
                                </h2>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </GuestLayout>
    );
}
