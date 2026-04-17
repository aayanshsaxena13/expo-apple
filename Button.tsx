import { Dimensions, TouchableHighlight } from "react-native";
import { Paragraph } from "./RichText";

export function Button(props: {
    onPress?: () => void;
    children?: string;
    color?: string;
    margin?: number;
    alignment?: any;
    secondaryColor?: string;
}) {
    const dim = Dimensions.get("window");
    return (
        <TouchableHighlight activeOpacity={0.75} underlayColor={props.secondaryColor} onPress={props.onPress} style={{
            alignSelf: props.alignment,
            margin: props.margin,
            backgroundColor: props.color,
            padding: dim.width < 420 ? 8: 12,
            borderRadius: dim.width < 420 ? 12 : 24,
            overflow: "hidden",
            width: dim.width < 420 ? 120 : 180,
        }}>
            <Paragraph alignment={"center"}>{props.children}</Paragraph>
        </TouchableHighlight>
    );
}