import { FlexAlignType, View } from "react-native";
import { Paragraph } from "./RichText";
import { themes } from "./constants/themes";

export default function Bubble({ children, margin, alignment, color }: { children?: string; margin?: number; alignment?: FlexAlignType; color?: string; }) {
    return (
        <View style={{
            alignSelf: alignment,
            margin: margin,
            backgroundColor: color ? color : themes.blue.primary,
            padding: 8,
            borderTopRightRadius: 16,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
        }}>
            <Paragraph>{children}</Paragraph>
        </View>
    )
}