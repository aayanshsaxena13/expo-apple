import { Animated, Dimensions, DimensionValue, FlexAlignType, Platform, Pressable, View } from "react-native";
import { useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { themes } from "./constants/themes";
import Menu from "./Menu";
import { GlassView } from "expo-glass-effect";
import * as Haptics from "expo-haptics";
import { Paragraph } from "./RichText";

const dim = Dimensions.get("window");

export default function Picker(props: {
    options: string[];
    setOption: (i: string) => void;
    margin?: number;
    alignment?: FlexAlignType;
    variant: "segmented" | "menu";
    option: string;
}) {
    const scale = useRef(new Animated.Value(1)).current;
    const [visible, setVisible] = useState<boolean>(false);
    const cellWidth: DimensionValue = dim.width / props.options.length;
    const left = useRef(new Animated.Value(0)).current;

    const onPressIn = () => {
        Animated.spring(scale, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    }

    const onPressOut = () => {
        Animated.spring(scale, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    }

    return (
        <>
            {Platform.OS === "ios" && props.variant === "menu" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                }}>
                    <Animated.View style={{
                        transform: [{ scale }],
                    }}>
                        <GlassView style={{
                            padding: dim.width < 450 ? 12 : 18,
                            borderRadius: dim.width < 450 ? 24 : 36,
                        }} glassEffectStyle={"regular"}>
                            <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={async () => {
                                setVisible(true);
                                await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                            }}>
                                <Ionicons size={dim.width < 450 ? 24 : 36} name="chevron-expand-outline" color={themes.blue.primary} />
                            </Pressable>
                        </GlassView>
                    </Animated.View>

                    <Menu options={props.options} visible={visible} setOption={props.setOption} setVisible={setVisible} />
                </View>
            }
            {Platform.OS === "ios" && props.variant === "segmented" &&
                <View style={{
                    margin: props.margin,
                    alignSelf: props.alignment,
                    flexDirection: "row",
                    width: dim.width,
                    position: "relative",
                    borderRadius: 24
                }}>
                    {/* Glass pill selector */}
                    <Animated.View style={{
                        transform: [{ translateX: left }, { scale }],
                        position: "absolute"
                    }}>
                        <GlassView
                            glassEffectStyle={"regular"}
                            style={{
                                width: cellWidth,
                                borderRadius: 24,
                                height: 36,
                                padding: 4,
                            }}
                        />
                    </Animated.View>

                    {/* Moment of truth list */}
                    {props.options.map((val: string, i: number) => (
                        <GlassView key={i.toString()} style={{
                            width: cellWidth,
                            borderTopLeftRadius: i === 0 ? 24 : 0,
                            borderTopRightRadius: i === props.options.length - 1 ? 24 : 0,
                            borderBottomLeftRadius: i === 0 ? 24 : 0,
                            borderBottomRightRadius: i === props.options.length - 1 ? 24 : 0,
                            height: 36,
                            padding: 4,
                        }} glassEffectStyle={"clear"}>
                            <Pressable onPressIn={() => {
                                Animated.sequence([
                                    Animated.timing(scale, {
                                        toValue: 1.2,
                                        duration: 100,
                                        useNativeDriver: true,
                                    }),
                                    Animated.parallel([
                                        Animated.spring(left, {
                                            toValue: (dim.width / props.options.length) * i,
                                            useNativeDriver: true,
                                        }),
                                        Animated.timing(scale, {
                                            toValue: 1,
                                            duration: 100,
                                            useNativeDriver: true,
                                        }),
                                    ])
                                ]).start();
                            }} onPressOut={() => props.setOption(val)}>
                                <Paragraph color={props.option === val ? themes.blue.primary : "white"} alignment="center">{val}</Paragraph>
                            </Pressable>
                        </GlassView>
                    ))}
                </View>
            }
        </>
    )
}