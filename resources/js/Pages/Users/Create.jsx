import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Alert, Button, Card, Form, Input, Select, Table } from "antd";
import { isEmpty, map } from "lodash";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { router } from "@inertiajs/react";

const Create = ({ auth, roles, ...props }) => {
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
            label: "FULL NAME",
            name: "name",
            rules: [{ required: true, message: "Full Name is required" }],
        },
        {
            label: "Email",
            name: "email",
            rules: [{ required: true, message: "Email is required" }],
        },
        {
            label: "PHONE",
            name: "phone",
            rules: [{ required: true, message: "Phone is required" }],
        },
        {
            label: "ROLE",
            name: "tile",
            rules: [{ required: true, message: "Role is required" }],
        },
    ];

    console.log("roles", roles);

    const handleSubmit = (data) => {
        console.log('data', data);
        setErrorMessage(null);
        router.post(route("users.store"), data);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    CREATE NEW USER ACCOUNT
                </h2>
            }
        >
            <Head title="CREATE USER" />

            <Card
                title="CREATE NEW USER ACCOUNT"
                extra={
                    <Link href={route('users.index')} className="btn" as="button">
                        <ArrowLeftOutlined /> BACK TO USERS
                    </Link>
                }
            >
                {errorMessage && <Alert message="ERROR" description={errorMessage} />}
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
                        label="SYSTEM ROLES"
                        name="roles"
                        rules={[
                            { required: true, message: "Roles is required" },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Select roles"
                            optionFilterProp="children"
                            mode="multiple"
                            options={map(roles, (role) => ({
                                value: role.id,
                                label: role.name,
                            }))}
                        />
                    </Form.Item>

                    <div>
                        <Button htmlType="submit" type="primary">
                            REGISTER USER
                        </Button>
                    </div>
                </Form>
            </Card>
        </AuthenticatedLayout>
    );
};

export default Create;
