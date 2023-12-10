import GuestLayout from "@/Layouts/GuestLayout";
import { Link, router } from "@inertiajs/react";
import { Alert, Button, Card, Col, Form, Input, Row } from "antd";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export default function Login({ status, canResetPassword, ...props }) {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        setErrorMessage(props?.errors?.error);
        if (!isEmpty(props.errors)) {
            const errors = Object.keys(props.errors).map((objKey) => ({
                name: objKey,
                errors: [props.errors[objKey]],
            }));
            form.setFields(errors);
        }
    }, [props.errors]);

    console.log("processing", processing);

    const submit = (data) => {
        setErrorMessage(null);
        router.post(route("login"), data, {
            onStart: setProcessing(true),
            onFinish: setProcessing(false),
            replace: true
        });
    };

    return (
        <GuestLayout>
            <Row justify="center">
                <Col md={{ span: 8 }}>
                    {status && (
                        <Alert showIcon closable message={status} style={{ marginBottom: 4 }} />
                    )}
                    {errorMessage && (
                        <Alert message={errorMessage} type="error" />
                    )}
                    <h3 className="text-center text-primary">
                        LOG IN TO YOUR ACCOUNT
                    </h3>
                    <Card bordered>
                        <Form
                            disabled={processing}
                            layout="vertical"
                            className="text-start"
                            form={form}
                            onFinish={submit}
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: "Email is Required",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Button
                                className="w-100"
                                htmlType="submit"
                                type="primary"
                                loading={processing}
                            >
                                LOG IN
                            </Button>

                            <div className="m-1">
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </GuestLayout>
    );
}
