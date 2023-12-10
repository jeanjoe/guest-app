import {
    AppstoreOutlined,
    LoginOutlined,
    UserOutlined,
    UserSwitchOutlined,
} from "@ant-design/icons";
import { router } from "@inertiajs/react";
import { Button, Card, Dropdown, Layout, Space } from "antd";
const { Content, Footer } = Layout;

export default function Authenticated({ user, children }) {
    const onClickItem = (data) => {
        if (data.key === "profile") router.get(route("profile.edit"));
        if (data.key === "logout") router.post(route("logout"));
    };
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Content
                style={{
                    paddingTop: "1em",
                    paddingLeft: "2em",
                    paddingRight: "2em",
                    overflow: "initial",
                }}
            >
                <Card
                    size="default"
                    className="m-1"
                    title={
                        <div className="text-primary">
                            {`${user?.name} (${user?.title})`}
                        </div>
                    }
                    extra={
                        <Space>
                            {!route().current("dashboard") && (
                                <Button
                                    icon={<AppstoreOutlined />}
                                    onClick={() =>
                                        router.get(route("dashboard"))
                                    }
                                    danger
                                    type="primary"
                                >
                                    DASHBOARD
                                </Button>
                            )}

                            <Dropdown.Button
                                menu={{
                                    icon: <UserOutlined />,
                                    onClick: onClickItem,
                                    items: [
                                        {
                                            label: "My Profile",
                                            key: "profile",
                                            icon: <UserSwitchOutlined />,
                                        },
                                        {
                                            label: "Logout",
                                            key: "logout",
                                            danger: true,
                                            icon: <LoginOutlined />,
                                        },
                                    ],
                                }}
                            >
                                {user?.email}
                            </Dropdown.Button>
                        </Space>
                    }
                    bodyStyle={{ padding: 0 }}
                />
                {children}
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                    borderTop: "1px solid",
                }}
            >
                ManBen256 DESIGNS &copy;{new Date().getFullYear()} Created by
                MANZEDE BENARD
            </Footer>
        </Layout>
    );
}
