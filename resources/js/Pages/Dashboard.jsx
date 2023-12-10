import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {
    ClusterOutlined,
    ContactsOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Head, Link } from "@inertiajs/react";
import { Card, Col, Row } from "antd";
import { map } from "lodash";

export default function Dashboard({ auth }) {
    const apps = [
        {
            title: "USERS",
            url: route("users.index"),
            icon: <TeamOutlined style={{ fontSize: "64px" }} />,
        },
        {
            title: "SERVICES",
            url: route("services.index"),
            icon: <ClusterOutlined style={{ fontSize: "64px" }} />,
        },
        {
            title: "TICKETS",
            url: route("tickets.index"),
            icon: <ContactsOutlined style={{ fontSize: "64px" }} />,
        },
    ];

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <Row gutter={14}>
                {map(apps, (app) => (
                    <Col md={{ span: 8 }} key={app.url}>
                        <Link href={app.url} className="text-center">
                            <Card
                                bordered
                                hoverable
                                style={{ textAlign: "center", border: '1px solid gray' }}
                            >
                                {app.icon}
                                <div
                                    style={{
                                        fontWeight: "bolder",
                                        fontSize: 24,
                                    }}
                                    className="text-3xl mt-2 font-bold"
                                >
                                    {app.title}
                                </div>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </AuthenticatedLayout>
    );
}
