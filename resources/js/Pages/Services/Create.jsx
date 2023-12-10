import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Head, Link, router } from "@inertiajs/react";
import { Alert, Button, Card, Form, Input, Select } from "antd";
import { isEmpty, map } from "lodash";
import { useEffect, useState } from "react";

const { TextArea } = Input;

const Create = ({ auth, ...props }) => {
    const [form] = Form.useForm();
    const [errorMessage, setErrorMessage] = useState(null);

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

    console.log("props", props);
    const formFields = [
        {
            label: "SERVICE NAME",
            name: "name",
            rules: [{ required: true, message: "Service Name is required" }],
        },
    ];

    const handleSubmit = (data) => {
        console.log("data", data);
        setErrorMessage(null);
        router.post(route("services.store"), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    CREATE NEW SERVICE
                </h2>
            }
        >
            <Head title="CREATE SERVICE" />

            <Card
                title="CREATE NEW SERVICE ACCOUNT"
                extra={
                    <Link href={route('services.index')} className="btn" as="button">
                        <ArrowLeftOutlined /> BACK TO SERVICES
                    </Link>
                }
            >
                {errorMessage && (
                    <Alert message="ERROR" description={errorMessage} />
                )}
                <Form
                    form={form}
                    labelCol={{ span: 6 }}
                    labelAlign="left"
                    onFinish={handleSubmit}
                >
                    {map(formFields, (field) => (
                        <Form.Item
                            key={field.name}
                            label={field.label}
                            name={field.name}
                            rules={field.rules}
                        >
                            <Input />
                        </Form.Item>
                    ))}

                    <Form.Item
                        label="SERVICE DESCRIPTION?"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: "Service Description is required",
                            },
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Service Status"
                        name="is_active"
                        rules={[
                            {
                                required: true,
                                message: "Service Status is required",
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select Status"
                            optionFilterProp="children"
                            options={[
                                {
                                    label: "ACTIVE",
                                    value: true,
                                },
                                {
                                    label: "IN ACTIVE",
                                    value: false,
                                },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="SERVICES CATEGORIES"
                        name="sub_services"
                        rules={[
                            {
                                required: true,
                                message: "Service Status is required",
                            },
                        ]}
                    >
                       <TextArea rows={6} />
                    </Form.Item>

                    <div className="text-end">
                        <Button htmlType="submit" type="primary">
                            CREATE SERVICE
                        </Button>
                    </div>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Create;
