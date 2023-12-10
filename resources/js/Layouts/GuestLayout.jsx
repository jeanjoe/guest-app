import { Image, Layout } from "antd";
import DCICLogo from "../Assets/dcic_logo.png";
import { Link } from "@inertiajs/react";

export default function GuestLayout({ children }) {
    return (
        <Layout
            style={{
                minHeight: "100vh",
                backgroundColor: "rgba(178, 166, 119, 0.34)",
            }}
        >
            <Layout.Content style={{ padding: "3em", overflow: "initial" }}>
                <div className="text-center">
                    <Link href={route('welcome')}>
                    <Image src={DCICLogo} preview={false} style={{ background: "#FF9209", padding: 4, borderRadius: 4 }} height={80} />
                    </Link>
                </div>
                <div className="text-center" style={{ marginBottom: "2em" }}>
                    <h1 className="text-center" style={{ color: "#fff" }}>
                        GUEST SELF-SERVICE POINT
                    </h1>
                </div>
                {children}
            </Layout.Content>
            <Layout.Footer
                style={{
                    textAlign: "center",
                    borderTop: "2px solid #FF9209",
                    background: "#016e57",
                    fontSize: 12,
                    color: "#fff",
                }}
            >
                &copy;{new Date().getFullYear()} - CREATED BY MANZEDE BENARD
            </Layout.Footer>
        </Layout>
    );
}
