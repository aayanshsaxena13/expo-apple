import { Dimensions, Text } from "react-native";
import { Link, RelativePathString } from "expo-router";

const dim = Dimensions.get("window");

export function LinkView({ color, href, children, alignment, margin }: { color?: string, href: RelativePathString, children?: string | string[] | number, alignment?: "center" | "auto" | "justify" | "left" | "right", margin?: number }) {
    return (
        <Link style={{
            color: color ? color : "rgb(63, 146, 255)",
            textAlign: alignment,
            fontSize: dim.width < 450 ? 20 : 24,
            fontWeight: 700,
            margin: margin,
        }} href={href}>
            {children}
        </Link>
    );
}

export function Header({ color, alignment, children, margin }: { color?: string, alignment?: "center" | "auto" | "justify" | "left" | "right", children?: string | number | string[], margin?: number }) {
    return (
        <Text style={{
            color: color ? color : "rgb(255, 255, 255)",
            fontSize: dim.width < 450 ? 28 : 36,
            fontWeight: 800,
            textAlign: alignment,
            margin: margin,
        }}>
            {children}
        </Text>
    );
}

export function Paragraph({ color, alignment, children, margin }: { color?: string, alignment?: "center" | "auto" | "justify" | "left" | "right", children?: string | string[] | number, margin?: number }) {
    return (
        <Text style={{
            color: color ? color : "rgb(255, 255, 255)",
            fontSize: dim.width < 450 ? 20 : 24,
            fontWeight: 700,
            textAlign: alignment,
            margin: margin,
        }}>
            {children}
        </Text>
    );
}