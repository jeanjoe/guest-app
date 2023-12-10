import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Card, Space, Table, Tag } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { join } from "lodash";

const Service = ({ auth, services, ...props }) => {
    const [pageSize, setPageSize] = useState(20);

    const onPageChange = (data) => {
        const {currentPage, page} = data
            setPageSize(currentPage);

            router.visit(route('services.index', { pageSize: page, currentPage }))
    }

    console.log("props", services, props);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    SERVICES
                </h2>
            }
        >
            <Head title="services" />

            <Card
                title="services"
                extra={
                    <Link href={route('services.create')} className="btn" as="button">
                        CREATE SERVICE
                    </Link>
                }
            >
                <Table
                    columns={[
                        {
                            title: "S/N",
                            dataIndex: "id",
                        },
                        {
                            title: "SERVICE NAME",
                            dataIndex: "name",
                            width: 150,
                        },
                        {
                            title: "IS ACTIVE?",
                            dataIndex: "is_active",
                            render: (active) => (
                                <Tag color={active ? "success" : "error"}>
                                    {active ? "YES" : "NO"}
                                </Tag>
                            ),
                            width: 120,
                        },
                        {
                            title: "CATEGORIES",
                            dataIndex: "sub_services",
                            render: (categories) => join(categories, ', '),
                        },
                        {
                            title: "CREATED ON",
                            dataIndex: "created_at",
                            render: (data) => moment(data).format("LLL"),
                            width: 150,
                        },
                        {
                            title: "CREATED BY",
                            dataIndex: "created_by",
                            render: (createdBy) => createdBy?.name,
                            width: 180,
                        },
                        {
                            title: 'ACTIONS',
                            key: 'actions',
                            width: 100,
                            render: (rowData) => <Space.Compact>
                                <Button type="primary" size="small" icon={<EditOutlined />}>EDIT</Button>
                                <Button type="primary" size="small" danger icon={<DeleteOutlined />}>DELETE</Button>
                            </Space.Compact>
                        }
                    ]}
                    rowKey="id"
                    dataSource={services?.data}
                    pagination={{
                        pageSize,
                        defaultPageSize: 20,
                        pageSizeOptions: [20, 40, 100, 200],
                        showSizeChanger: true,
                        onChange: onPageChange,
                    }}
                />
            </Card>
        </AuthenticatedLayout>
    );
};

export default Service;
