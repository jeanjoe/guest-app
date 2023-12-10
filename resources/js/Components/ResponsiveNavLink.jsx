import { Link } from "@inertiajs/react";

export default function ResponsiveNavLink({
    active = false,
    children,
    ...props
}) {
    return <Link {...props}>{children}</Link>;
}
