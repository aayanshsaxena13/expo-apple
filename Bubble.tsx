import { Dimensions, View } from "react-native";
import { Paragraph } from "./RichText";
import { themes } from "@/constants/themes";

const dim = Dimensions.get("window");

export default function Bubble({ children, margin, alignment, color }: { children?: string; margin?: number; alignment?: any; color?: any; }) {
    return (
        <View style={{
            alignSelf: alignment,
            margin: margin,
            backgroundColor: color ? color : themes.blue.primary,
            paddingHorizontal: dim.width < 420 ? 8 : 12,
            paddingVertical: dim.width < 420 ? 6 : 8,
            borderTopRightRadius: dim.width < 420 ? 16 : 24,
            borderBottomLeftRadius: dim.width < 420 ? 16 : 24,
            borderBottomRightRadius: dim.width < 420 ? 16 : 24,
        }}>
            <Paragraph>{children}</Paragraph>
        </View>
    )
}