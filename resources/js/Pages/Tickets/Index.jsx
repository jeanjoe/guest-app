import React from "react";
import PropTypes, { object } from "prop-types";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Button, Card, Table, Tag } from "antd";
import moment from "moment";
import { SyncOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";

const Index = ({ auth, tickets, pageSize, page, ...props }) => {
    console.log("tickets", tickets);
    return (
        <Authenticated user={auth?.user || {}}>
            <Card
                size="small"
                title="CURRENT SERVICES"
                extra={
                    <Button
                    size="small"
                        icon={<SyncOutlined />}
                        onClick={() => router.visit(route("tickets.index"))}
                    >
                        REFRESH
                    </Button>
                }
                bodyStyle={{ padding: 0 }}
            >
                <Table
                    size="small"
                    dataSource={tickets?.data || []}
                    pagination={{
                        pageSize: pageSize || 20,
                        current: page,
                    }}
                    columns={[
                        {
                            title: "S/N",
                            dataIndex: "id",
                        },
                        {
                            title: "REQUEST TYPE",
                            dataIndex: "category",
                            render: (data) => (
                                <Tag
                                    className="fw-bold text-uppercase"
                                    color="volcano"
                                >
                                    {data}
                                </Tag>
                            ),
                        },
                        {
                            title: "SERVICE",
                            dataIndex: "service",
                            render: (service) => service?.name,
                        },
                        {
                            title: "TICKET NUMBER",
                            dataIndex: "ticket_number",
                        },
                        {
                            title: "DATE CREATED",
                            dataIndex: "created_at",
                            render: (date) =>
                                moment(date).format("ddd, MMM Do YYYY"),
                        },
                        {
                            title: "TIME IN",
                            dataIndex: "created_at",
                            render: (date) => moment(date).format("h:mm:ss a"),
                        },
                        {
                            title: "SERVICED",
                            dataIndex: "serviced",
                            render: (serviced) => (
                                <Tag
                                    className="fw-bold text-uppercase"
                                    color={serviced ? "success" : "warning"}
                                >
                                    {serviced ? "YES" : "NO"}
                                </Tag>
                            ),
                        },
                        {
                            title: "EXPIRY DATE",
                            dataIndex: "expiry_date",
                            render: (date) => moment(date).format("LLL"),
                        },
                    ]}
                    rowKey="id"
                />
            </Card>
        </Authenticated>
    );
};

Index.propTypes = {
    tickets: PropTypes.oneOfType([object]),
};

export default Index;
