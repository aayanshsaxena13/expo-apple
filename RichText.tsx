import { Dimensions, Text } from "react-native";
import { Link } from "expo-router";

const dim = Dimensions.get("window");

export function LinkView({ color, href, children, alignment, margin }: { color?: string, href: any, children?: any, alignment?: any, margin?: number }) {
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

export function Header({ color, alignment, children, margin }: { color?: any, alignment?: any, children?: string, margin?: number }) {
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

export function Paragraph({ color, alignment, children, margin }: { color?: any, alignment?: any, children?: any, margin?: number }) {
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

export function StatusCode({ code, alignment, children, margin }: { code?: any, alignment?: any, children?: any, margin?: number }) {
    // iOS uses specific hex values for system colors (Red, Green, Orange)
    const isDanger = code === "danger";
    const isGood = code === "good";

    const textColor = isDanger ? "#FF3B30" : isGood ? "#34C759" : "#FF9500";

    return (
        <Paragraph color={textColor} alignment={alignment} margin={margin}>{children}</Paragraph>
    );
}
