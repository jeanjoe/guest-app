import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Button, Card, Table } from "antd";

const User = ({ auth, users, ...props }) => {
    console.log("props", users, props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    USERS
                </h2>
            }
        >
            <Head title="USERS" />

            <Card
                title="USERS"
                extra={
                    <Link
                        href={route("users.create")}
                        className="btn"
                        as="button"
                    >
                        CREATE USERS
                    </Link>
                }
                style={{ padding: 0 }}
            >
                <Table
                    columns={[
                        {
                            title: "S/N",
                            dataIndex: "id",
                        },
                        {
                            title: "FULL NAME",
                            dataIndex: "name",
                        },
                        {
                            title: "EMAIL",
                            dataIndex: "email",
                        },
                        {
                            title: "PHONE",
                            dataIndex: "phone",
                        },
                        {
                            title: "ACCOUNT TYPE",
                            dataIndex: "account_type",
                        },
                        {
                            title: "ROLE",
                            dataIndex: "title",
                        },
                    ]}
                    dataSource={users}
                />
            </Card>
        </AuthenticatedLayout>
    );
};

export default User;
