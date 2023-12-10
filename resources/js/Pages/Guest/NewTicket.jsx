import GuestLayout from "@/Layouts/GuestLayout";
import { router } from "@inertiajs/react";
import { Button, Card, Col, Empty, Row } from "antd";
import { isEmpty, map } from "lodash";
import React, { useState } from "react";
import ServiceModal from "./ServiceModal";
import { AppstoreOutlined, RollbackOutlined } from "@ant-design/icons";

const NewTicket = ({ services, ...props }) => {
    const [selectedService, setSelectedService] = useState(null);
    const [openModal, setOpenModal] = useState(false);

    const goBackHome = () => router.get(route("welcome"));

    const onOpenModal = (data) => {
        setSelectedService(data);
        setOpenModal(true);
    };

    const onCancel = () => {
        setOpenModal(false);
        setSelectedService(null);
    };

    console.log("services", services);
    return (
        <GuestLayout>
            <Row justify="center" gutter={{ md: 8 }}>
                <Col md={{ span: 16 }}>
                    <div>
                        {isEmpty(services) ? (
                            <Empty
                                description="NO SERVICES ARE AVAILABLE"
                                children={
                                    <Button
                                        onClick={goBackHome}
                                        danger
                                        type="primary"
                                        icon={<RollbackOutlined />}
                                    >
                                        GO BACK
                                    </Button>
                                }
                            />
                        ) : (
                            <div>
                                <Card
                                    bordered
                                    style={{ marginBottom: 20 }}
                                    bodyStyle={{ padding: 0 }}
                                    title="SELECT A SERVICE TO CONTINUE"
                                    extra={
                                        <Button
                                            type="primary"
                                            onClick={goBackHome}
                                            danger
                                            icon={<RollbackOutlined />}
                                        >
                                            GO HOME
                                        </Button>
                                    }
                                />
                                <Row wrap gutter={{ md: 8 }}>
                                    {map(services, (service, index) => (
                                        <Col
                                            // md={{ span: 8 }}
                                            // sm={{ span: 24 }}
                                            key={service.id}
                                            style={{ height: "100%" }}
                                            flex={3}
                                        >
                                            <Card
                                                hoverable
                                                bordered
                                                className="text-center"
                                                onClick={() =>
                                                    onOpenModal(service)
                                                }
                                                style={{
                                                    marginBottom: "0.5em",
                                                }}
                                            >
                                                <AppstoreOutlined
                                                    style={{ fontSize: 48 }}
                                                />
                                                <h2 className="text-uppercase text-primary">
                                                    {`${service.name}`}
                                                </h2>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
            {openModal && !isEmpty(selectedService) && (
                <ServiceModal
                    open={openModal}
                    onCancel={onCancel}
                    service={selectedService}
                    {...props}
                />
            )}
        </GuestLayout>
    );
};

export default NewTicket;
