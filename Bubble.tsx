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
            paddingHorizontal: dim.width < 450 ? 12 : 20,
            paddingVertical: dim.width < 450 ? 8 : 12,
            borderTopRightRadius: dim.width < 450 ? 16 : 24,
            borderBottomLeftRadius: dim.width < 450 ? 16 : 24,
            borderBottomRightRadius: dim.width < 450 ? 16 : 24,
        }}>
            <Paragraph>{children}</Paragraph>
        </View>
    )
}