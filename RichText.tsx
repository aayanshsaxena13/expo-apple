import { Dimensions, Text } from "react-native";
import { Link } from "expo-router";

const dim = Dimensions.get("window");

export function LinkView({ color, href, children, alignment, margin }: { color?: string, href: any, children?: any, alignment?: any, margin?: number }) {
    return (
        <Link style={{
            color: color ? color : "rgb(63, 146, 255)",
            textAlign: alignment,
            fontSize: dim.width < 420 ? 20 : 24,
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
            fontSize: dim.width < 420 ? 28 : 36,
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
            fontSize: dim.width < 420 ? 20 : 24,
            fontWeight: 700,
            textAlign: alignment,
            margin: margin,
        }}>
            {children}
        </Text>
    );
}

export function StatusCode({ code, alignment, children, margin }: { code?: any, alignment?: any, children?: any, margin?: number }) {
    return (
        <Text style={{
            color: code === "danger" ? "rgb(255, 0, 0)" : code === "good" ? "rgb(0, 150, 64)" : "rgb(255, 174, 0)",
            fontSize: dim.width < 420 ? 20 : 24,
            fontWeight: 700,
            textAlign: alignment,
            margin: margin,
            backgroundColor: code === "danger" ? "rgb(255, 176, 173)" : code === "good" ? "rgb(176, 255, 173)" : "rgb(255, 255, 132)",
            padding: dim.width < 420 ? 12 : 16,
            borderRadius: dim.width < 420 ? 8 : 12,
            alignSelf: alignment ? alignment : "center",
            borderBottomWidth: 2,
            borderColor: code === "danger" ? "rgb(255, 0, 0)" : code === "good" ? "rgb(0, 150, 64)" : "rgb(255, 174, 0)",
        }}>
            {children}
        </Text>
    );
}