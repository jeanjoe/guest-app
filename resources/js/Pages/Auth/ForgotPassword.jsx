import GuestLayout from "@/Layouts/GuestLayout";
import { Head, router } from "@inertiajs/react";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { isEmpty, map } from "lodash";
import { useEffect, useState } from "react";

export default function ForgotPassword({ status, ...props }) {
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (!isEmpty(props.errors)) {
            setErrorMessage(props.errors?.[Object.keys(props.errors)?.[0]]);
        } else setErrorMessage(null);
    }, [props.errors]);

    const submit = (data) => {
        router.post(route("password.email", data));
    };

    return (
        <GuestLayout>
            <Row justify="center">
                <Col md={{ span: 8 }}>
                    <Card>
                        <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Forgot your password? No problem. Just let us know
                            your email address and we will email you a password
                            reset link that will allow you to choose a new one.
                        </div>

                        {status && <Alert message={status} />}
                        {errorMessage && (
                            <Alert showIcon type="error" message={errorMessage} style={{ marginBottom: 4, marginTop: 4}} />
                        )}

                        <Form onFinish={submit} layout="vertical">
                            <Form.Item
                                name="email"
                                label="EMAIL"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email is Required",
                                    },
                                ]}
                            >
                                <Input type="email" />
                            </Form.Item>

                            <Button
                                htmlType="submit"
                                type="primary"
                                className="w-100"
                            >
                                Email Password Reset Link
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </GuestLayout>
    );
}
