import GuestLayout from "@/Layouts/GuestLayout";
import { PrinterOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Alert, Button, Card, Col, Empty, Row, Space } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTicket from "./PrintTicket";

const Generated = ({ ticket, ...props }) => {
    const componentRef = useRef();

    useEffect(() => {
        if (isEmpty(ticket)) router.get(route("welcome"));
    }, [ticket]);

    const goBackHome = () => router.get(route("welcome"));

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: goBackHome,
    });

    console.log("ticket", ticket);
    return (
        <GuestLayout>
            <div>
                {isEmpty(ticket) ? (
                    <Empty
                        description="NO TICKET GENERATED"
                        children={
                            <Button onClick={goBackHome} danger type="primary">
                                GO BACK
                            </Button>
                        }
                    />
                ) : (
                    <div>
                        <Row justify="center">
                            <Col md={{ span: 8 }}>
                                <Card
                                    bordered
                                    size="small"
                                    style={{ marginBottom: 10 }}
                                    bodyStyle={{ padding: 0 }}
                                    title={`TICKET #${ticket.ticket_number}`}
                                    extra={
                                        <Space>
                                            <Button
                                                type="primary"
                                                onClick={goBackHome}
                                                danger
                                                size="small"
                                            >
                                                GO TO START
                                            </Button>
                                            <Button
                                                type="primary"
                                                size="small"
                                                icon={<PrinterOutlined />}
                                                onClick={handlePrint}
                                            >
                                                PRINT TICKET
                                            </Button>
                                        </Space>
                                    }
                                />
                                <Alert
                                    showIcon
                                    style={{ marginBottom: 5 }}
                                    type="success"
                                    className="text-uppercase fw-bold"
                                    message="Ticket Generated Successfully"
                                />

                                <div ref={componentRef}>
                                    <PrintTicket ticket={ticket} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                )}
            </div>
        </GuestLayout>
    );
};

export default Generated;
