import GuestLayout from "@/Layouts/GuestLayout";
import {
    NumberOutlined,
    PrinterOutlined,
    RollbackOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Button, Card, Col, Empty, Form, Input, Row, Space } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import PrintTicket from "./PrintTicket";

const TicketSearch = ({ ticket, ticketNumber, ...props }) => {
    const [processing, setProcessing] = useState(false);
    const componentRef = useRef();

    const goBackHome = () => router.get(route("welcome"));

    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({ ticket_number: ticketNumber });
    }, [ticketNumber]);

    console.log("props", ticket, props);

    const searchTicket = (data) =>
        router.visit(route("tickets.search", data), {
            onProgress: () => setProcessing(true),
            onFinish: () => setProcessing(false),
        });

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        onAfterPrint: goBackHome,
    });

    return (
        <GuestLayout>
            <Row justify="center">
                <Col md={{ span: 18 }}>
                    <Card
                        size="small"
                        bordered
                        title={
                            <Form
                                form={form}
                                layout="inline"
                                onFinish={searchTicket}
                                className="m-1"
                                size="small"
                            >
                                <Form.Item
                                    name="ticket_number"
                                    label="ENTER YOUR TICKET NO."
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                "Ticket Number is Required",
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<NumberOutlined />}
                                        placeholder="0001"
                                    />
                                </Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    icon={<SearchOutlined />}
                                    loading={processing}
                                >
                                    SEARCH TICKET
                                </Button>
                            </Form>
                        }
                        extra={
                            <Space wrap>
                                <Button
                                    onClick={goBackHome}
                                    danger
                                    type="primary"
                                    size="small"
                                    icon={<RollbackOutlined />}
                                >
                                    GO BACK
                                </Button>
                                {!isEmpty(ticket) && (
                                    <Button
                                        icon={<PrinterOutlined />}
                                        onClick={handlePrint}
                                        type="primary"
                                        size="small"
                                    >
                                        PRINT TICKET
                                    </Button>
                                )}
                            </Space>
                        }
                    >
                        {isEmpty(ticket) ? (
                            <Empty description="NO TICKET AVAILABLE ARE AVAILABLE" />
                        ) : (
                            <div ref={componentRef}>
                                <PrintTicket ticket={ticket} />
                            </div>
                        )}
                    </Card>
                </Col>
            </Row>
        </GuestLayout>
    );
};

export default TicketSearch;
