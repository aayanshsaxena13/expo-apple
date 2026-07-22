import { Dimensions, FlexAlignType, Pressable, Animated, Platform } from "react-native";
import { Paragraph } from "./RichText";
import { JSX, useRef } from "react";
import { GlassView } from "expo-glass-effect";

const dim = Dimensions.get("window");

export function Button(props: {
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
                }]}>
                    <Paragraph alignment={"center"}>{props.children}</Paragraph>
                </Pressable> :
                <Pressable style={({ pressed }) => [{
                    borderRadius: dim.width < 450 ? 16 : 24,
                    overflow: "hidden",
                    padding: dim.width < 450 ? 8 : 12,
                    alignSelf: props.alignment,
                    margin: props.margin,
                    backgroundColor: !pressed ? "rgba(36, 36, 36, 0.3)" : "rgba(72, 72, 72, 0.3)",
                }]} onPress={props.onPress}>
                    <Paragraph color={props.color} alignment={"center"}>{props.children}</Paragraph>
                </Pressable>
            }
        </>
    );
}

export function GlassButton(props: {
    onPress?: () => void;
    children?: JSX.Element;
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
        <>
            {Platform.OS === "ios" &&
                <Animated.View style={{
                    transform: [{ scale: scale }],
                }}>
                    <GlassView style={{
                        padding: dim.width < 450 ? 8 : 12,
                        margin: props.margin,
                        alignSelf: props.alignment,
                        borderRadius: dim.width < 450 ? 16 : 24,
                    }} glassEffectStyle={"regular"}>
                        <Pressable onLongPress={() => onLongPress.start()} onPressIn={() => onPressIn.start()} onPressOut={() => onPressOut.start()} onPress={props.onPress}>
                            {props.children}
                        </Pressable>
                    </GlassView>
                </Animated.View>
            }
        </>
    )
}