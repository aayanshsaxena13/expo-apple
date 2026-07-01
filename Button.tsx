import { Dimensions, FlexAlignType, Pressable, Animated } from "react-native";
import { Paragraph } from "./RichText";
import { useRef } from "react";
import { GlassView } from "expo-glass-effect";

const dim = Dimensions.get("window");

export default function Button(props: {
    onPress?: () => void;
    children?: string;
    color?: string;
    margin?: number;
    alignment?: FlexAlignType;
    secondaryColor?: string;
    variant?: "regular" | "capsule",
}) {
    return (
        <>
            {props.variant === "regular" ?
                <Pressable onPress={props.onPress} style={({ pressed }) => [{
                    alignSelf: props.alignment,
                    margin: props.margin,
                    backgroundColor: !pressed ? props.color : props.secondaryColor,
                    opacity: !pressed ? 1 : 0.75,
                    padding: dim.width < 450 ? 8 : 12,
                    borderRadius: dim.width < 450 ? 12 : 24,
                    overflow: "hidden",
                    width: dim.width < 450 ? 120 : 180,
                }]}>
                    <Paragraph alignment={"center"}>{props.children}</Paragraph>
                </Pressable> :
                <Pressable style={({ pressed }) => [{
                    width: dim.width < 450 ? 120 : 180,
                    borderRadius: dim.width < 450 ? 16 : 24,
                    overflow: "hidden",
                    padding: dim.width < 450 ? 8 : 12,
                    alignSelf: props.alignment,
                    margin: props.margin,
                    backgroundColor: !pressed ? "rgb(36, 36, 36)" : "rgb(72, 72, 72)",
                }]} onPress={props.onPress}>
                    <Paragraph color={props.color} alignment={"center"}>{props.children}</Paragraph>
                </Pressable>
            }
        </>
    );
}

export function GlassButton(props: {
    onPress?: () => void;
    children?: string;
    margin?: number;
    alignment?: FlexAlignType;
}) {
    const scale = useRef(new Animated.Value(1)).current;

    const onPressIn = Animated.spring(scale, {
        toValue: 0.8,
        useNativeDriver: true,
    });

    const onPressOut = Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
    });

    const onLongPress = Animated.spring(scale, {
        toValue: 1.2,
        useNativeDriver: true,
    });

    return (
        <Animated.View style={{
            transform: [{ scale: scale }],
        }}>
            <GlassView style={{
                padding: dim.width < 450 ? 8 : 12,
                margin: props.margin,
                alignSelf: props.alignment,
                borderRadius: dim.width < 450 ? 16 : 24,
                width: dim.width < 450 ? 120 : 180,
            }} glassEffectStyle={"regular"}>
                <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                    <Paragraph alignment="center">{props.children}</Paragraph>
                </Pressable>
            </GlassView>
        </Animated.View>
    )
}